import { File } from "../models/fileModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    Credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const findParentFolder = async (workspaceId, path) => {
  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
  if (normalizedPath === "/" || normalizedPath === "") return null;

  const segments = normalizedPath.split("/").filter(Boolean);
  const folderName = segments[segments.length - 1];
  const parentPath = "/" + segments.slice(0, -1).join("/");

  // Find folder with name and path and isFolder: true
  return await File.findOne({
    workspaceId,
    name: folderName,
    path: parentPath || "/",
    isFolder: true,
  });
};

const createFile = asyncHandler(async (req, res) => {
  const { workspaceId, path = "/", name, fileType, uploadedBy } = req.body;

  if (!workspaceId || !name) {
    throw new ApiError(400, "workspaceId and file name are required");
  }

  const parent = await findParentFolder(workspaceId, path);

  const fullS3Key = `${workspaceId}/content${path.endsWith("/") ? path : path + "/"}${name}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fullS3Key,
    Body: "",
    ContentType: "text/plain",
  });

  await s3.send(command);

  const file = await File.create({
    workspaceId,
    parent: parent ? parent._id : null,
    name,
    isFolder: false,
    fileType,
    path,
    s3Key: fullS3Key,
    uploadedBy,
    sizeInBytes: 0,
    versionHistory: [
      {
        s3Key: fullS3Key,
        uploadedBy,
      },
    ],
  });

  return res.status(201).json(
    new ApiResponse(201, file, "File created successfully")
  );
});

const updateFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const { content, updatedBy } = req.body;

  if (!content || !updatedBy) {
    throw new ApiError(400, "Both 'content' and 'updatedBy' are required");
  }

  const file = await File.findById(fileId);
  if (!file) {
    throw new ApiError(404, "File not found");
  }

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: file.s3Key,
    Body: content,
    ContentType: "text/plain",
  });

  await s3.send(command);

  file.updatedAt = new Date();
  file.sizeInBytes = Buffer.byteLength(content, "utf8");

  file.versionHistory.push({
    s3Key: file.s3Key,
    uploadedBy: updatedBy,
    uploadedAt: new Date(),
  });

  await file.save();

  return res.status(200).json(
    new ApiResponse(200, file, "File updated successfully")
  );
});

const getWorkspaceFiles = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;

    if (!workspaceId) {
        throw new ApiError(400, "Workspace ID is required");
    }

    const files = await File.find({ workspaceId });

    return res.status(200).json(
        new ApiResponse(200, files, "Files fetched successfully")
    );
});

export { getWorkspaceFiles,createFile,updateFile };
