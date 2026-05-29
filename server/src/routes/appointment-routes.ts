import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";
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

router.get("/:id", requireAuth, getAppointmentByIdByDoctor);
router.get("/:id", requireAuth, getAppointmentByIdByPatient);
router.get("/doctor", requireAuth, getAllAppointmentsByDoctors);
router.get("/patient", requireAuth, getAllAppointmentsByPatients);
router.post("/", requireAuth, createAppointment);
router.post("/:id", requireAuth, updateAppointmentByDoctors);
router.post("/:id", requireAuth, updateAppointmentByPatients);

export default router;