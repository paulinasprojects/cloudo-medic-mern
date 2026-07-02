export interface EditDoctorRequest {
  address: string;
  phoneNumber: string;
  bio: string;
  hospital: string;
  consultationFee: number | string;
}