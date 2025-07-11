import {Router} from "express";
import { acceptInvites, changeCurrentPassword, getAllUsers, getInvites, getUserInfo, loginUser, logoutUser, registerUser, updateAccessToken, updateProfile } from "../controllers/userControllers.js";
import { varifyJWT } from "../middlewares/authMiddleware.js";

const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/updateaccesstoken").post(updateAccessToken);
router.route("/me").get(varifyJWT,getUserInfo);
router.route("/updateprofile").post(varifyJWT,updateProfile);
router.route("/changepassword").post(varifyJWT,changeCurrentPassword);
router.route("/getallusers").get(getAllUsers);
router.route("/getallinvites").get(varifyJWT,getInvites);
router.route("/acceptinvite").post(varifyJWT,acceptInvites);

export default router;