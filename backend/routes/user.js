import express from "express";
import {
  register,
  login,
  profile,
  logout,
  updateProfile,
  changePassword,
  updateAvatar,
  forgetPassword,
  resetPassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/profile", isAuthenticated, profile);
router.get("/logout", isAuthenticated, logout);

router.put("/updateprofile", isAuthenticated, updateProfile);
router.put("/changepassword", isAuthenticated, changePassword);
router.put("/updateavatar", isAuthenticated, singleUpload, updateAvatar);

router.route("/forgetpassword").post(forgetPassword).put(resetPassword);

export default router;
