import { Router } from "express";
import { getPatientProfile, createPatientProfile, updatePatientProfile, deletePatientProfile } from "../controllers/patient-profile-controller";
import { requireAuth } from "../middleware/auth-middleware";

const router = Router();

router.get("/", requireAuth, getPatientProfile);
router.post("/", requireAuth, createPatientProfile);
router.post("/", requireAuth, updatePatientProfile);
router.delete("/", requireAuth, deletePatientProfile);


export default router;