import {Router} from "express";
import { acceptInvites, changeCurrentPassword, getAllUsers, getInvites, getUserInfo, loginUser, logoutUser, registerUser, updateAccessToken, updateProfile } from "../controllers/userControllers.js";

const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/updateaccesstoken").post(updateAccessToken);
router.route("/getuser").get(getUserInfo);
router.route("/updateprofile").post(updateProfile);
router.route("/changepassword").post(changeCurrentPassword);
router.route("/getallusers").get(getAllUsers);
router.route("/getallinvites").get(getInvites);
router.route("/acceptinvite").post(acceptInvites);

export default router;