import { v4 as uuidv4 } from 'uuid';
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


export const AppointmentStatus = [
  {
    id: uuidv4(),
    value: "scheduled",
    placeholder: "SCHEDULED"
  },
  {
    id: uuidv4(),
    value: "completed",
    placeholder: "COMPLETED"
  },
  {
    id: uuidv4(),
    value: "cancelled",
    placeholder: "CANCELLED"
  },
]

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

export interface MedicalTests {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  bloodTests?: string[];
  biochemistryTests?: string[];
  imagingTests?: string[];
  urineTests?: string[];
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  doctorProfile?: Doctor;
  patientProfile?: Patient;
}


export const BloodTest = [
  {
    id: uuidv4(),
    value: "cbc",
    placeholder: "CBC",
  },
  {
    id: uuidv4(),
    value: "bmp",
    placeholder: "BMP",
  },
  {
    id: uuidv4(),
    value: "rbc",
    placeholder: "RBC",
  },
  {
    id: uuidv4(),
    value: "hct",
    placeholder: "HCT",
  },
  {
    id: uuidv4(),
    value: "wbc",
    placeholder: "WBC",
  },
  {
    id: uuidv4(),
    value: "ldl",
    placeholder: "LDL",
  },
  {
    id: uuidv4(),
    value: "hdl",
    placeholder: "HDL",
  },
  {
    id: uuidv4(),
    value: "vitamind",
    placeholder: "VITAMIN D",
  },
  {
    id: uuidv4(),
    value: "tsh",
    placeholder: "TSH",
  },
]


export const Biochemistry = [
  {
    id: uuidv4(),
    value: "glucose",
    placeholder: "GLUCOSE"
  },
  {
    id: uuidv4(),
    value: "creat",
    placeholder: "CREAT"
  },
  {
    id: uuidv4(),
    value: "asat",
    placeholder: "ASAT"
  },
  {
    id: uuidv4(),
    value: "alat",
    placeholder: "ALAT"
  },
  {
    id: uuidv4(),
    value: "egfr",
    placeholder: "EGFR"
  },
]


export const Urine = [
  {
    id: uuidv4(),
    value: "urine",
    placeholder: "URINE"
  },
  {
    id: uuidv4(),
    value: "glucose",
    placeholder: "GLUCOSE"
  },
  {
    id: uuidv4(),
    value: "protein",
    placeholder: "PROTEIN"
  },
  {
    id: uuidv4(),
    value: "blood",
    placeholder: "BLOOD"
  },
]


export const MedicalTestStatus = [
  {
    id: uuidv4(),
    value: "scheduled",
    placeholder: "SCHEDULED"
  },
  {
    id: uuidv4(),
    value: "pending",
    placeholder: "PENDING"
  },
  {
    id: uuidv4(),
    value: "completed",
    placeholder: "COMPLETED"
  },
  {
    id: uuidv4(),
    value: "cancelled",
    placeholder: "CANCELLED"
  },
]

export const ImagingTest = [
  {
    id: uuidv4(),
    value: "ctscan",
    placeholder: "CTSCAN"
  },
  {
    id: uuidv4(),
    value: "cta",
    placeholder: "CTA"
  },
  {
    id: uuidv4(),
    value: "mri",
    placeholder: "MRI"
  },
  {
    id: uuidv4(),
    value: "pet",
    placeholder: "PET"
  },
  {
    id: uuidv4(),
    value: "mammography",
    placeholder: "MAMMOGRAPHY"
  },
  {
    id: uuidv4(),
    value: "echocardiogram",
    placeholder: "ECHOCARDIOGRAM"
  },
]

export const VaccineStatus = [
  {
    id: uuidv4(),
    value: "scheduled",
    placeholder: "SCHEDULED"
  },
  {
    id: uuidv4(),
    value: "completed",
    placeholder: "COMPLETED"
  },
  {
    id: uuidv4(),
    value: "cancelled",
    placeholder: "CANCELLED"
  },
]