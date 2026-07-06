import { Router } from "express";
import { requireAuth, requireDoctor, requirePatient } from "../middleware/auth-middleware";
import {
  getAllVaccinesByDoctors,
  getAllVaccinesByPatients,
  getAllCompletedVaccinesByDoctors,
  getAllCompletedVaccinesByPatient,
  getAllScheduledVaccinesByDoctors,
  getAllScheduledVaccinesByPatient,
  getCompletedVaccineByIdByDoctors,
  getCompletedVaccineByIdByPatients,
  getScheduledVaccineByIdByDoctors,
  getScheduledVaccineByIdByPatients,
  getVaccineByIdByDoctor,
  getVaccineByIdByPatient,
  createVaccine,
  updateVaccineByDoctors,
  updateVaccineByPatients
} from "../controllers/vaccine-controller";

const router = Router();

router.get("/doctor", requireAuth, requireDoctor, getAllVaccinesByDoctors);
router.get("/patient", requireAuth, requirePatient, getAllVaccinesByPatients);
router.get("/doctor/completed", requireAuth, requireDoctor, getAllCompletedVaccinesByDoctors);
router.get("/patient/completed", requireAuth, requirePatient, getAllCompletedVaccinesByPatient);
router.get("/doctor/scheduled", requireAuth, requireDoctor, getAllScheduledVaccinesByDoctors);
router.get("/patient/scheduled", requireAuth, requirePatient, getAllScheduledVaccinesByPatient);
router.get("/doctor/completed/:id", requireAuth, requireDoctor, getCompletedVaccineByIdByDoctors);
router.get("/patient/completed/:id", requireAuth, requirePatient, getCompletedVaccineByIdByPatients);
router.get("/doctor/scheduled/:id", requireAuth, requireDoctor, getScheduledVaccineByIdByDoctors);
router.get("/patient/scheduled/:id", requireAuth, requirePatient, getScheduledVaccineByIdByPatients);
router.get("/:id", requireAuth, requireDoctor, getVaccineByIdByDoctor);
router.get("/:id", requireAuth, requirePatient, getVaccineByIdByPatient);
router.post("/", requireAuth, requireDoctor, createVaccine);
router.patch("/:id", requireAuth, requireDoctor, updateVaccineByDoctors);
router.patch("/:id", requireAuth, requirePatient, updateVaccineByPatients);

export default router;