import { Router } from "express";
import { getDoctorProfile, createDoctorProfile, updateDoctorProfileByDoctor } from "../controllers/doctor-profile-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/", requireAuth, getDoctorProfile);
router.post("/", requireAuth, createDoctorProfile);
router.post("/", requireAuth, updateDoctorProfileByDoctor);


export default router;