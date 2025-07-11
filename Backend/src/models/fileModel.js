import mongoose from "mongoose";


const fileSchema = mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace', required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File', default: null
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        default: "/"
    },
    isFolder: {
        type: Boolean,
        default: false
    },
    fileType: {
        type: String
    },
    s3Key: {
        type: String
    },
    uploadedBy: {
        type: String
    },
    sizeInBytes: {
        type: Number
    },
    versionHistory: [
        {
            s3Key: String,
            uploadedAt: { type: Date, default: Date.now },
            uploadedBy: String
        }
    ],
    isLocked: {
        type: Boolean,
        default: false
    },
    lockedBy: {
        type: String 
    },
    lockedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const File = mongoose.model("File", fileSchema);
