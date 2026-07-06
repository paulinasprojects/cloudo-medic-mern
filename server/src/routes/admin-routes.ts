import { Router } from "express";
import { requireAdmin, requireAuth } from "../middleware/auth-middleware";
import { 
  registerUserByAdmin,
  getAllUsers,
  updateUserByAdmins,
  editAdminUser,
  deleteUserByAdmins,
  getAllDoctors, 
  getAllPatients,
  createDoctor, 
  createPatient,
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
  deleteMedicalTestByAdmins,
  getAllVaccinesTestsByAdmins,
  getAllScheduledVaccinesByAdmins,
  getAllCompletedVaccinesByAdmins,
  deleteVaccineByAdmins,
} from "../controllers/admin-controller";

const router = Router();

router.use(requireAuth);
router.use(requireAdmin);

{/* Users Routes */}
router.post("/users", registerUserByAdmin)
router.get("/users", getAllUsers);
router.patch("/users", editAdminUser);
router.patch("/users/:id", updateUserByAdmins);
router.delete("/users/:id", deleteUserByAdmins);

{/* Doctors Routes */}
router.get("/doctors", getAllDoctors);
router.post("/doctors", createDoctor)
router.patch("/doctors/:id", updateDoctorProfileByAdmin);
router.delete("/doctors/:id", deleteDoctorProfileByAdmin);


{/* Patients Routes */}
router.get("/patients", getAllPatients);
router.post("/patients", createPatient);
router.patch("/patients/:id", updatePatientProfileByAdmin);
router.delete("/patients/:id", deletePatientProfileByAdmin);

{/* Appointments Routes */}

router.get("/appointments", getAllAppointmentsByAdmins);
router.get("/appointments/doctor/:doctorId", getAppointmentsByDoctorId);
router.get("/appointments/patient/:patientId", getAppointmentsByPatientId);
router.get("/appointments/:id", getAppointmentByIdByAdmins);
router.patch("/appointments/:id", updateAppointmentByAdmins);
router.delete("/appointments/:id", deleteAppointmentByAdmins);

{/* Prescriptions Routes */}
router.get("/prescriptions", getAllPrescriptionsByAdmins);
router.get("/prescriptions/:id", getPrescriptionByIdByAdmins);
router.get("/prescriptions/patient/:patientId", getPrescriptionsByPatientId);
router.get("/prescriptions/doctor/:doctorId", getPrescriptionsByDoctorId);
router.patch("/prescriptions/:id", updatePrescriptionByAdmins);
router.delete("/prescriptions/:id", deletePrescriptionByAdmins);

{/* Medical Tests Routes */}
router.get("/medicaltests",  getAllMedicalTestsByAdmins);
router.get("/medicaltests/scheduled",  getAllScheduledTestsByAdmins);
router.get("/medicaltests/completed",  getAllCompletedTestsByAdmins);
router.delete("/medicaltests/:id",  deleteMedicalTestByAdmins);

{/* Vaccine Routes */}
router.get("/vaccines", getAllVaccinesTestsByAdmins);
router.get("/vaccines/scheduled", getAllScheduledVaccinesByAdmins);
router.get("/vaccines/completed", getAllCompletedVaccinesByAdmins);
router.get("/vaccines/:id", deleteVaccineByAdmins);

export default router;