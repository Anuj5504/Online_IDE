import {Router} from "express";
import { createWorkspace, deleteWorkspaces, getUserWorkspaces } from "../controllers/workspaceControllers.js";
import { varifyJWT } from "../middlewares/authMiddleware.js";

const router=Router();
    
router.route("/createworkspace").post(varifyJWT,createWorkspace);
router.route("/getallworkspace").get(varifyJWT,getUserWorkspaces);
router.route("/deleteworkspace").post(varifyJWT,deleteWorkspaces);

export default router;