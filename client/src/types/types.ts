export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface UsersTypes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = "doctor",
  PATIENT = "patient"
};


export interface AuthResponse {
  user: User;
  token: string;
}

export interface Doctors {
  id: string;
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
  education: string;
  doctorLevel: string;
  gender: string;
  specialization: string;
  hospital: string;
  licenseNumber: string;
  consultationFee: number;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
  user: User; 
}
export interface Doctor {
  id: string;
  userId: string;
  address: string;
  phoneNumber: string;
  workPhoneNumber: string;
  bio: string;
  dateOfBirth: string;
  education: string;
  doctorLevel: string;
  gender: string;
  specialization: string;
  hospital: string;
  licenseNumber: string;
  consultationFee: number;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
  user: User; 
}

export interface Patient {
    id: string;
  userId: string;
  address: string;
  phoneNumber: string;
  bio: string;
  dateOfBirth: string;
    gender: string;
  bloodType: string;
  emergencyContactNumber: string;
  emergencyContactName: string;
  allergies: string;
  medicalHistory: string;
  createdAt: string;
  updatedAt: string;
  user: User; 
}

export enum BloodTypes {
  "0+" = "0+",
  "0-"  = "0-",
  "A+" = "A+",
  "A-" = "A-",
  "B+"= "B+",
  "AB+" = "AB+",
  "AB-" = "AB-"
}

export enum Gender {
  "MALE" = "male",
  "FEMALE" = "female"
}

export enum Education {
  "UNDERGRADUATE" = "undergraduate",
  "PRIMARY" = "primary",
  "GRADUATE" = "graduate"
}

export enum DoctorLevel {
  "INTERN" = "intern",
  "RESIDENT" = "resident",
  "FELLOW" = "fellow",
  "ATTENDING" = "attending"
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  doctorProfile?: Doctor;
  patientProfile?: Patient;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medication: string | string[];
  dosage: string | string[] | null;
  instructions: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  doctorProfile?: Doctor;
  patientProfile?: Patient;
}

export interface editAdminUserRequest {
  firstName: string;
  lastName: string;
}

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export interface Vaccine {
  id: string;
  patientId: string;
  doctorId: string;
  vaccinationName: string;
  vaccinationDate: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  doctorProfile?: Doctor;
  patientProfile?: Patient;
}
