import { Router } from "express";
import { login, registerUser, updateUser, getUser } from "../controllers/user-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/user", requireAuth, getUser);
router.post("/user", requireAuth, updateUser);

export default router;