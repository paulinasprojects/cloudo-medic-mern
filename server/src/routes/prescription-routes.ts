import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
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

router.get("/", requireAuth, getActivePrescriptionsByPatients);
router.get("/", requireAuth, getExpiredPrescriptionsByPatients);
router.get("/:id", requireAuth, getPrescriptionByIdByDoctors);
router.get("/:id", requireAuth, getPrescriptionByIdByPatients);
router.get("/doctor", requireAuth, getAllPrescriptionsByDoctors);
router.get("/patient", requireAuth, getAllPrescriptionsByPatients);
router.post("/", requireAuth, createPrescription);
router.post("/:id", requireAuth, updatePrescription);

export default router;