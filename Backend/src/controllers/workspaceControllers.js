import { File } from "../models/fileModel.js";
import { User } from "../models/userModel.js";
import { Workspace } from "../models/workspaceModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { templateMap } from "../utils/templates.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const createWorkspace = asyncHandler(async (req, res) => {
    try {
        const { name, description, collaborators, templateType, tags } = req.body;

        const user = req.user;

        if (!user) {
            throw new ApiError(400, "User doesnot exist");
        }

        if (!name) {
            throw new ApiError(400, "Workspace Name required");
        }

        if (!templateType) {
            throw new ApiError(400, `Invalid or missing template for type: ${templateType}`);
        }

        const workspace = await Workspace.create({
            name,
            owner: user._id,
            description,
            pendingInvites: collaborators,
            templateType,
            tags,
        })

        if (!workspace || !workspace._id) {
            throw new ApiError(500, "Workspace creation failed, no ID returned");
        }
        user.workspaces.push(workspace._id);
        await user.save();

        for (const collaborator of collaborators) {
            const invitedUser = await User.findOne({ email: collaborator.email });
            if(!invitedUser) {
                continue;
            }
            if (invitedUser) {
                invitedUser.pendingInvites.push({
                    workspaceId: workspace._id,
                    role: collaborator.role,
                });
                await invitedUser.save();
            }
        }
        const { name: fileName, content } = templateMap[templateType];
        const s3Key = `${workspace._id}/${fileName}`;

        const putCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,    
            Key: s3Key,
            Body: content,
            ContentType: "text/plain",
        });

        await s3.send(putCommand);

        const file = await File.create({
            workspaceId: workspace._id,
            parent: null, // root folder
            name: fileName,
            isFolder: false,
            fileType: templateType,
            s3Key: s3Key,
            uploadedBy: user._id.toString(),
            sizeInBytes: Buffer.byteLength(content, 'utf8'),
            versionHistory: [
                {
                    s3Key: s3Key,
                    uploadedBy: user._id.toString()
                }
            ]
        });


        //SAVE root file in workspace
        workspace.documents.push(file._id);
        await workspace.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, workspace, "Workspace created successfully")
            );

    } catch (error) {
        throw new ApiError(400, error, "Failed to create new workspace");
    }
})

const getUserWorkspaces = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user || !user.workspaces) {
    throw new ApiError(401, "Unauthorized or no workspaces");
  }

  const workspaces = await Workspace.find({ _id: { $in: user.workspaces } }).populate("owner", "firstname lastname username email");

  res.status(200).json(new ApiResponse(200, workspaces, "Fetched user workspaces"));
});

export const deleteWorkspaces = asyncHandler(async (req, res) => {
  const user = req.user;
  const {workspaces } = req.body;
  console.log(user)
  if (!user || !user._id) { 
    throw new ApiError(401, "Unauthorized");
  }

  if (!Array.isArray(workspaces) || workspaces.length === 0) {
    throw new ApiError(400, "No workspaces provided to delete");
  }

  for (const workspaceId of workspaces) {
    const files = await File.find({ workspaceId });

    for (const file of files) {
      if (file.s3Key) {
        try {
          await deleteFileFromS3(file.s3Key);
        } catch (err) {
          console.error(`Failed to delete S3 file: ${file.s3Key}`, err);
        }
      }
    }

    await File.deleteMany({ workspaceId });

    await Workspace.findByIdAndDelete(workspaceId);
  }

  res.status(200).json(new ApiResponse(200, { deleted: workspaces.length }, "Workspaces deleted successfully"));
});

export { createWorkspace,getUserWorkspaces };