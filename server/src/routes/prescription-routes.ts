import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import { 
  getAllPrescriptionsByAdmins,
  getAllPrescriptionsByDoctors,
  getAllPrescriptionsByPatients,
  getPrescriptionsByPatientId,
  getPrescriptionsByDoctorId,
  getActivePrescriptionsByPatients,
  getExpiredPrescriptionsByPatients,
  getPrescriptionByIdByAdmins,
  getPrescriptionByIdByDoctors,
  getPrescriptionByIdByPatients,
  createPrescription,
  updatePrescription,
  deletePrescription
   } from "../controllers/prescription-controller";

const router = Router();

router.get("/", requireAuth, getAllPrescriptionsByAdmins);
router.get("/", requireAuth, getActivePrescriptionsByPatients);
router.get("/", requireAuth, getExpiredPrescriptionsByPatients);
router.get("/:id", requireAuth, getPrescriptionByIdByAdmins);
router.get("/:id", requireAuth, getPrescriptionByIdByDoctors);
router.get("/:id", requireAuth, getPrescriptionByIdByPatients);
router.get("/doctor", requireAuth, getAllPrescriptionsByDoctors);
router.get("/patient", requireAuth, getAllPrescriptionsByPatients);
router.get("/patient/:patientId", requireAuth, getPrescriptionsByPatientId);
router.get("/doctor/:doctorId", requireAuth, getPrescriptionsByDoctorId);
router.post("/", requireAuth, createPrescription);
router.post("/:id", requireAuth, updatePrescription);
router.delete("/:id", requireAuth, deletePrescription);

export default router;