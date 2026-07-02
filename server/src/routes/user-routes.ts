import { Router } from "express";
import { login, registerUser, updateUser, getUser, uploadUserImage, deleteUserImage } from "../controllers/user-controller";
import { requireAuth } from "../middleware/auth-middleware";
import { cloudinaryUpload } from "../utils/cloudinary-upload";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.post("/user/image", requireAuth, cloudinaryUpload.single("image"), uploadUserImage);
router.delete("/user/image", requireAuth, deleteUserImage);
router.get("/user", requireAuth, getUser);
router.patch("/user", requireAuth, updateUser);

export default router;