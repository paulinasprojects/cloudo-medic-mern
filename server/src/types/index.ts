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