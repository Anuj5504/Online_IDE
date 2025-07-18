import {Router} from "express";
import { createFile, getFileContent, getWorkspaceFiles, updateFile } from "../controllers/fileControllers.js";
import { varifyJWT } from "../middlewares/authMiddleware.js";

const router=Router();

router.route("/:workspaceId").get(getWorkspaceFiles);
router.route("/createFile").get(createFile);
router.route("/updatefile/:fileId").get(updateFile);
router.route("/getfilecontent/:fileId").get(varifyJWT,getFileContent);

export default router;