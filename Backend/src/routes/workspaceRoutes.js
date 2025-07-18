import {Router} from "express";
import { createWorkspace, getUserWorkspaces } from "../controllers/workspaceControllers.js";
import { varifyJWT } from "../middlewares/authMiddleware.js";

const router=Router();
    
router.route("/createworkspace").post(varifyJWT,createWorkspace);
router.route("/getallworkspace").get(varifyJWT,getUserWorkspaces);

export default router;