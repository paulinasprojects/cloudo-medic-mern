import { Router } from "express";
import { getDoctorProfile, createDoctorProfile, updateDoctorProfileByDoctor, updateDoctorProfileByAdmins, deleteDoctorProfile } from "../controllers/doctor-profile-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/", requireAuth, getDoctorProfile);
router.post("/", requireAuth, createDoctorProfile);
router.post("/", requireAuth, updateDoctorProfileByDoctor);
router.post("/", requireAuth, updateDoctorProfileByAdmins);
router.delete("/", requireAuth, deleteDoctorProfile);


export default router;