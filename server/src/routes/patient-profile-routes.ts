import { Router } from "express";
import { getPatientProfile, createPatientProfile, updatePatientProfileByPatient, deletePatientProfile, updatePatientProfileByAdmin } from "../controllers/patient-profile-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/", requireAuth, getPatientProfile);
router.post("/", requireAuth, createPatientProfile);
router.post("/", requireAuth, updatePatientProfileByPatient);
router.post("/", requireAuth, updatePatientProfileByAdmin);
router.delete("/", requireAuth, deletePatientProfile);


export default router;