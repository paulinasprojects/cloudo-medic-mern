import sequelize from "../config/db";
import User from "./User";
import DoctorProfile from "./DoctorProfile";
import PatientProfile from "./PatientProfile";
import Appointment from "./Appointment";
import Prescription from "./Prescription";
import MedicalTest from "./MedicalTest";

User.hasOne(DoctorProfile, {
  foreignKey: "userId",
  as: "doctorProfile",
  onDelete: "CASCADE",
});

DoctorProfile.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

User.hasOne(PatientProfile, {
  foreignKey: "userId",
  as: "patientProfile",
  onDelete: "CASCADE",
});

PatientProfile.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

DoctorProfile.hasMany(Appointment, {
  foreignKey: "doctorId",
  as: "appointments",
  onDelete: "CASCADE",
});

PatientProfile.hasMany(Appointment, {
  foreignKey: "patientId",
  as: "appointments",
  onDelete: "CASCADE",
});

Appointment.belongsTo(DoctorProfile, {
  foreignKey: "doctorId",
  as: "doctorProfile"
});

Appointment.belongsTo(PatientProfile, {
  foreignKey: "patientId",
  as: "patientProfile"
});

DoctorProfile.hasMany(Prescription, {
  foreignKey: "doctorId",
  as: "prescriptions",
  onDelete: "CASCADE",
});

PatientProfile.hasMany(Prescription, {
  foreignKey: "patientId",
  as: "prescriptions",
  onDelete: "CASCADE"
});

Prescription.belongsTo(DoctorProfile, {
  foreignKey: "doctorId",
  as: "doctorProfile"
});

Prescription.belongsTo(PatientProfile, {
  foreignKey: "patientId",
  as: "patientProfile"
})

DoctorProfile.hasMany(MedicalTest, {
  foreignKey: "doctorId",
  as: "medical_tests",
  onDelete: "CASCADE"
});

PatientProfile.hasMany(MedicalTest, {
  foreignKey: "patientId",
  as: "medical_tests",
  onDelete: "CASCADE"
});

MedicalTest.belongsTo(DoctorProfile, {
  foreignKey: "doctorId",
  as: "doctorProfile"
});

MedicalTest.belongsTo(PatientProfile, {
  foreignKey: "patientId",
  as: "patientProfile"
});

export { User, DoctorProfile, PatientProfile, Appointment, Prescription, MedicalTest };
export const syncModels = async (): Promise<void> => {
  const isDev = process.env.NODE_ENV === "development";

  await sequelize.sync({ alter: isDev });

  console.log(`Models synced (${isDev ? "alter-mode" : "no-force"})`);
}