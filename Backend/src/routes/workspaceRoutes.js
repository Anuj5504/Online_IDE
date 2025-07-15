import {Router} from "express";
import { createWorkspace } from "../controllers/workspaceControllers.js";
import { varifyJWT } from "../middlewares/authMiddleware.js";

const router=Router();

router.route("/createworkspace").post(varifyJWT,createWorkspace);

export default router;