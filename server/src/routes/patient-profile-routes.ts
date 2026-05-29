import { Router } from "express";
import { getPatientProfile, createPatientProfile, updatePatientProfileByPatient } from "../controllers/patient-profile-controller";
import { requireAuth, requirePatient } from "../middleware/auth-middleware";

const router = Router();

router.use(requireAuth)
router.use(requirePatient)

router.get("/", getPatientProfile);
router.post("/", createPatientProfile);
router.post("/", updatePatientProfileByPatient);


export default router;