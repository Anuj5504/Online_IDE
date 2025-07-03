import {Router} from "express";
import { createWorkspace } from "../controllers/workspaceControllers.js";

const router=Router();

router.route("/createworkspace").post(createWorkspace);

export default router;