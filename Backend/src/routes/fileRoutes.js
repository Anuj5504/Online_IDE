import {Router} from "express";
import { createFile, getWorkspaceFiles, updateFile } from "../controllers/fileControllers.js";

const router=Router();

router.route("/:workspaceId").get(getWorkspaceFiles);
router.route("/createFile").get(createFile);
router.route("/updatefile/:fileId").get(updateFile);

export default router;