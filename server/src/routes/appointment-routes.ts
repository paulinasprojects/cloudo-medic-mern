import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
import {
  getAllAppointmentsByAdmins, 
  getAllAppointmentsByDoctors, 
  getAllAppointmentsByPatients, 
  getAppointmentsByDoctorId, 
  getAppointmentsByPatientId,
  getAppointmentByIdByAdmins,
  getAppointmentByIdByDoctor,
  getAppointmentByIdByPatient,
  createAppointment,
  deleteAppointment,
  updateAppointmentByAdmins,
  updateAppointmentByDoctors,
  updateAppointmentByPatients
} from "../controllers/appointment-controller";

const router = Router();

router.get("/", requireAuth, getAllAppointmentsByAdmins);
router.get("/:id", requireAuth, getAppointmentByIdByAdmins);
router.get("/:id", requireAuth, getAppointmentByIdByDoctor);
router.get("/:id", requireAuth, getAppointmentByIdByPatient);
router.get("/doctor/:doctorId", requireAuth, getAppointmentsByDoctorId);
router.get("/patient/:patientId", requireAuth, getAppointmentsByPatientId);
router.get("/doctor", requireAuth, getAllAppointmentsByDoctors);
router.get("/patient", requireAuth, getAllAppointmentsByPatients);
router.post("/", requireAuth, createAppointment);
router.post("/:id", requireAuth, updateAppointmentByAdmins);
router.post("/:id", requireAuth, updateAppointmentByDoctors);
router.post("/:id", requireAuth, updateAppointmentByPatients);
router.delete("/:id", requireAuth, deleteAppointment);

export default router;