import { Router } from "express";
import { getDoctorProfile, createDoctorProfile, updateDoctorProfile, deleteDoctorProfile } from "../controllers/doctor-profile-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/", requireAuth, getDoctorProfile);
router.post("/", requireAuth, createDoctorProfile);
router.post("/", requireAuth, updateDoctorProfile);
router.delete("/", requireAuth, deleteDoctorProfile);


export default router;