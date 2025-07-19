import { PutObjectCommand,S3Client} from "@aws-sdk/client-s3";
import { File } from "../models/fileModel.js";
import { Workspace } from "../models/workspaceModel.js";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

export const saveFileContentAndName = async ({ fileId, userId, content, newName }) => {
  const file = await File.findById(fileId);
  if (!file) {
    throw new Error("File not found");
  }


  const workspace = await Workspace.findById(file.workspaceId);
  const isMember =
    workspace.owner.toString() === userId ||
    workspace.members.map(String).includes(userId);

  if (!isMember) {
    throw new Error("Unauthorized access to file");
  }

  if (newName && newName !== file.name) {
    file.name = newName;
    await file.save();
  }

  // Save new content to S3
//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: file.s3Key,
//     Body: content,
//   });

//   await s3.send(command);

  return { fileId, name: file.name, workspaceId: workspace._id.toString() };
};
