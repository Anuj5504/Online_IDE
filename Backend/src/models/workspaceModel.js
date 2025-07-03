import mongoose from "mongoose";

const workspaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    templateType: {
        type: String,
        requrired: true,
    },
    members: [
        {
            userId: { type: String, required: true },
            role: { type: String, enum: ['owner', 'editor', 'viewer'], required: true },
            joinedAt: { type: Date, default: Date.now }
        }
    ],
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    activityLog: [
        {
            userId: String,
            action: String,
            timestamp: { type: Date, default: Date.now }
        }
    ],
    pendingInvites: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
            email: { type: String, required: true },
            role: { type: String, enum: ["editor", "viewer"] },
            invitedAt: { type: Date, default: Date.now }
        }
    ],
    tags: [String],
    description: {
        type: String
    },
    lastModifiedBy: {
        type: String,
        default: null
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


export const Workspace = mongoose.model("Workspace", workspaceSchema);
