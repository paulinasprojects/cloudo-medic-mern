import { Router } from "express";
import { requireAuth, requireDoctor, requirePatient } from "../middleware/auth-middleware";
import {
  getAllAppointmentsByDoctors, 
  getAllAppointmentsByPatients, 
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
router.post("/", requireAuth, requireDoctor, createAppointment);
router.post("/:id", requireAuth, requireDoctor, updateAppointmentByDoctors);
router.post("/:id", requireAuth, requirePatient, updateAppointmentByPatients);

export default router;