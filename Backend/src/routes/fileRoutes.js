import {Router} from "express";
import { createFile, getFileContent, getWorkspaceFiles, updateFile } from "../controllers/fileControllers.js";
import { varifyJWT } from "../middlewares/authMiddleware.js";

const router=Router();

router.route("/:workspaceId").get(getWorkspaceFiles);
router.route("/createfile").post(varifyJWT,createFile);
router.route("/updatefile/:fileId").post(updateFile);
router.route("/getfilecontent/:fileId").get(varifyJWT,getFileContent);

export default router;