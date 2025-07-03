import { User } from "../models/userModel.js";
import { Workspace } from "../models/workspaceModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createWorkspace = asyncHandler(async (req, res) => {
    try {
        const { userid, name, description, collaborators, templateType, tags } = req.body;

        const user = await User.findById(userid);

        if (!user) {
            throw new ApiError(400, "User doesnot exist");
        }

        if (!name) {
            throw new ApiError(400, "Workspace Name required");
        }

        if (!templateType) {
            throw new ApiError(400, "Workspace template required");
        }

        const workspace = await Workspace.create({
            name,
            owner: user._id,
            description,
            pendingInvites: collaborators,
            templateType,
            tags,
        })

        user.workspaces.push(workspace._id);
        await user.save();

        for (const collaborator of collaborators) {
            const invitedUser = await User.findOne({ email: collaborator.email });
            if (invitedUser) {
                invitedUser.pendingInvites.push({
                    workspaceId: workspace._id,
                    role: collaborator.role,
                });
                await invitedUser.save();
            }
        }


        return res
            .status(200)
            .json(
                new ApiResponse(200, workspace, "Workspace created successfully")
            );

    } catch (error) {
        throw new ApiError(400, error, "Failed to create new workspace");
    }
})

export { createWorkspace };