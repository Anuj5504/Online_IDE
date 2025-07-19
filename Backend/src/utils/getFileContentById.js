import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { File } from "../models/fileModel.js";
import { Workspace } from "../models/workspaceModel.js";
import { ApiError } from "../utils/ApiError.js";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const streamToString = async (stream) =>
  await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

export const getS3ObjectStream = async (key) => {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  const data = await s3.send(command);
  return data.Body;
};

export const getFileContentForSocket = async (fileId, userId) => {
  const file = await File.findById(fileId);
  if (!file) throw new ApiError(404, "File not found");
  const workspace = await Workspace.findById(file.workspaceId);
  if (!workspace.members.includes(userId) && workspace.owner !== userId) {
    throw new ApiError(403, "Not authorized");
  }

  const stream = await getS3ObjectStream(file.s3Key);
  const content = await streamToString(stream);
  return { file, content };
};
