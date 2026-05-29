import { Router } from "express";
import { requireAuth, requireDoctor, requirePatient } from "../middleware/auth-middleware";
import { 
  getAllPrescriptionsByDoctors,
  getAllPrescriptionsByPatients,
  getActivePrescriptionsByPatients,
  getExpiredPrescriptionsByPatients,
  getPrescriptionByIdByDoctors,
  getPrescriptionByIdByPatients,
  createPrescription,
  updatePrescription,
   } from "../controllers/prescription-controller";

const router = Router();

router.get("/", requireAuth, requirePatient, getActivePrescriptionsByPatients);
router.get("/", requireAuth, requirePatient, getExpiredPrescriptionsByPatients);
router.get("/:id", requireAuth, requireDoctor, getPrescriptionByIdByDoctors);
router.get("/:id", requireAuth, requirePatient, getPrescriptionByIdByPatients);
router.get("/doctor", requireAuth, requireDoctor, getAllPrescriptionsByDoctors);
router.get("/patient", requireAuth, requirePatient, getAllPrescriptionsByPatients);
router.post("/", requireAuth, requireDoctor, createPrescription);
router.post("/:id", requireAuth, requireDoctor, updatePrescription);

export default router;