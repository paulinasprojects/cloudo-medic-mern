import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth-middleware";
import { 
  getAllUsers, 
  getAllDoctors, 
  getAllPatients, 
  updateDoctorProfileByAdmin, 
  updatePatientProfileByAdmin,
  deleteDoctorProfileByAdmin, 
  deletePatientProfileByAdmin,
  getAllAppointmentsByAdmins, 
  getAppointmentsByDoctorId, 
  getAppointmentsByPatientId, 
  getAppointmentByIdByAdmins, 
  updateAppointmentByAdmins, 
  deleteAppointmentByAdmins, 
  getAllPrescriptionsByAdmins, 
  getPrescriptionsByPatientId, 
  getPrescriptionsByDoctorId, 
  getPrescriptionByIdByAdmins, 
  updatePrescriptionByAdmins, 
  deletePrescriptionByAdmins,
  getAllMedicalTestsByAdmins,
  getAllCompletedTestsByAdmins,
  getAllScheduledTestsByAdmins,
  deleteMedicalTestByAdmins
} from "../controllers/admin-controller";

const router = Router();

router.use(requireAuth);
router.use(requireAdmin);

{/* Users Routes */}
router.get("/users", getAllUsers);

{/* Doctors Routes */}
router.get("/doctors", getAllDoctors);
router.post("/doctors/:id", updateDoctorProfileByAdmin);
router.post("/doctors/:id", deleteDoctorProfileByAdmin);


{/* Patients Routes */}
router.get("/patients", getAllPatients);
router.post("/patients/:id", updatePatientProfileByAdmin);
router.post("/patients/:id", deletePatientProfileByAdmin);

{/* Appointments Routes */}

router.get("/appointments", getAllAppointmentsByAdmins);
router.get("/appointments/doctor/:doctorId", getAppointmentsByDoctorId);
router.get("/appointments/patient/:patientId", getAppointmentsByPatientId);
router.get("/appointments/:id", getAppointmentByIdByAdmins);
router.post("/appointments/:id", requireAuth, updateAppointmentByAdmins);
router.delete("/appointments/:id", requireAuth, deleteAppointmentByAdmins);

{/* Prescriptions Routes */}
router.get("/prescriptions", getAllPrescriptionsByAdmins);
router.get("/prescriptions/:id", requireAuth, getPrescriptionByIdByAdmins);
router.get("/prescriptions/patient/:patientId", requireAuth, getPrescriptionsByPatientId);
router.get("/prescriptions/doctor/:doctorId", requireAuth, getPrescriptionsByDoctorId);
router.post("/prescriptions/:id", requireAuth, updatePrescriptionByAdmins);
router.delete("/prescriptions/:id", requireAuth, deletePrescriptionByAdmins);

{/* Medical Tests Routes */}
router.get("/medicaltests",  getAllMedicalTestsByAdmins);
router.get("/medicaltests/scheduled",  getAllScheduledTestsByAdmins);
router.get("/medicaltests/completed",  getAllCompletedTestsByAdmins);
router.get("/medicaltests/:id",  deleteMedicalTestByAdmins);

export default router;