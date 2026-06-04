export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = "doctor",
  PATIENT = "patient"
};

export enum DoctorLevel {
   INTERN = "intern",
   RESIDENT = "resident",
   FELLOW = "fellow",
   ATTENDING = "attending"
}

export enum DoctorEducation {
  UNDERGRADUATE = "undergraduate",
  PRIMARY = "primary",
  GRADUATE = "graduate",
}

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum MedicalTestStatus {
  SCHEDULED = "scheduled",
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum BloodTest {
  CBC = "cbc",
  BMP = "bmp",
  RBC = "rbc",
  HCT = "hct",
  WBC = "wbc",
  LDL = "ldl",
  HDL = "hdl",
  VITAMIND = "vitamind",
  TSH = "tsh",
}

export enum Biochemistry {
  GLUCOSE = "glucose",
  CREAT = "creat",
  ASAT = "asat",
  ALAT = "alat",
  EGFR = "egfr"
}

export enum ImagingTest {
  CTSCAN = "ctscan",
  CTA = "cta",
  MRI = "mri",
  PET = "pet",
  MAMMOGRAPHY = "mammography",
  ECHOCARDIOGRAM = "echocardiogram", 
}

export enum Urine {
  URINE = "urine",
  GLUCOSE = "glucose",
  PROTEIN = "protein",
  BLOOD = "blood",
}