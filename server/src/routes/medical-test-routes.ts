import { Router } from "express";
import { requireAuth, requireDoctor, requirePatient } from "../middleware/auth-middleware";
import {
getAllMedicalTestsByDoctors,
getAllMedicalTestsByPatients,
getAllCompletedTestsByDoctors,
getAllCompletedTestsByPatients,
getAllScheduledTestsByDoctors,
getAllScheduledTestsByPatients,
getScheduledTestByIdByDoctors,
getScheduledTestByIdByPatients,
getCompletedTestByIdByDoctors,
getCompletedTestByIdByPatients,
getMedicalTestByIdByDoctors,
getMedicalTestByIdByPatients,
createMedicalTestByDoctors,
updateMedicalTestByDoctors,
} from "../controllers/medical-test-controller";

const router = Router();

router.get("/doctor", requireAuth, requireDoctor, getAllMedicalTestsByDoctors);
router.get("/patient", requireAuth, requirePatient, getAllMedicalTestsByPatients);
router.get("/doctor/completed", requireAuth, requireDoctor, getAllCompletedTestsByDoctors);
router.get("/patient/completed", requireAuth, requirePatient, getAllCompletedTestsByPatients);
router.get("/doctor/scheduled", requireAuth, requireDoctor, getAllScheduledTestsByDoctors);
router.get("/patient/scheduled", requireAuth, requirePatient, getAllScheduledTestsByPatients);
router.get("/doctor/scheduled/:id", requireAuth, requireDoctor, getScheduledTestByIdByDoctors);
router.get("/patient/scheduled/:id", requireAuth, requirePatient, getScheduledTestByIdByPatients);
router.get("/doctor/completed/:id", requireAuth, requireDoctor, getCompletedTestByIdByDoctors);
router.get("/patient/completed/:id", requireAuth, requirePatient, getCompletedTestByIdByPatients);
router.get("/:id", requireAuth, requireDoctor, getMedicalTestByIdByDoctors);
router.get("/:id", requireAuth, requirePatient, getMedicalTestByIdByPatients);
router.post("/", requireAuth, requireDoctor, createMedicalTestByDoctors);
router.post("/:id", requireAuth, requireDoctor, updateMedicalTestByDoctors);

export default router;