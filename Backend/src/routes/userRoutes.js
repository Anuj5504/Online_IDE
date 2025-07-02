import {Router} from "express";
import { changeCurrentPassword, getUserInfo, loginUser, logoutUser, registerUser, updateAccessToken, updateProfile } from "../controllers/userControllers.js";

const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/updateaccesstoken").post(updateAccessToken);
router.route("/getuser").get(getUserInfo);
router.route("/updateprofile").post(updateProfile);
router.route("/changepassword").post(changeCurrentPassword);

export default router;