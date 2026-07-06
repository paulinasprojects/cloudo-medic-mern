import { Router } from "express";
import { requireAuth, requireDoctor, requirePatient } from "../middleware/auth-middleware";
import {
  getAllAppointmentsByDoctors, 
  getAllAppointmentsByPatients,
  getAllCompletedAppointmentsByDoctors,
  getAllCompletedAppointmentsByPatients,
  getAllScheduledAppointmentsByDoctors,
  getAllScheduledAppointmentsByPatients, 
  getCompletedAppointmentByIdByDoctors,
  getCompletedAppointmentByIdByPatients,
  getScheduledAppointmentByIdByDoctors,
  getScheduledAppointmentByIdByPatients,
  getAppointmentByIdByDoctor,
  getAppointmentByIdByPatient,
  createAppointment,
  updateAppointmentByDoctors,
  updateAppointmentByPatients
} from "../controllers/appointment-controller";

const router = Router();

router.get("/:id", requireAuth, requireDoctor, getAppointmentByIdByDoctor);
router.get("/:id", requireAuth, requirePatient, getAppointmentByIdByPatient);
router.get("/doctor", requireAuth, requireDoctor, getAllAppointmentsByDoctors);
router.get("/patient", requireAuth, requirePatient, getAllAppointmentsByPatients);
router.get("/doctor/completed", requireAuth, requireDoctor, getAllCompletedAppointmentsByDoctors);
router.get("/patient/completed", requireAuth, requirePatient, getAllCompletedAppointmentsByPatients);
router.get("/doctor/scheduled", requireAuth, requireDoctor, getAllScheduledAppointmentsByDoctors);
router.get("/patient/scheduled", requireAuth, requirePatient, getAllScheduledAppointmentsByPatients);
router.get("/doctor/completed/:id", requireAuth, requireDoctor, getCompletedAppointmentByIdByDoctors);
router.get("/patient/completed/:id", requireAuth, requirePatient, getCompletedAppointmentByIdByPatients);
router.get("/doctor/scheduled/:id", requireAuth, requireDoctor, getScheduledAppointmentByIdByDoctors);
router.get("/patient/scheduled/:id", requireAuth, requirePatient, getScheduledAppointmentByIdByPatients);
router.post("/", requireAuth, requireDoctor, createAppointment);
router.patch("/:id", requireAuth, requireDoctor, updateAppointmentByDoctors);
router.patch("/:id", requireAuth, requirePatient, updateAppointmentByPatients);

export default router;