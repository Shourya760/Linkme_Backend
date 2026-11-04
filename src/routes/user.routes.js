import express from "express";
import { create_user, login_user, logout_user, deactivate_user, upload_image } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authmiddleware.js";
import { uploadSingleImage } from "../middleware/imageUpload.js";


const router = express.Router();


router.post("/register", create_user);
router.post("/login", login_user);
router.post("/logout", logout_user);
router.delete("/account", authenticate, deactivate_user);
router.post("/upload", authenticate, uploadSingleImage, upload_image);

export default router;
