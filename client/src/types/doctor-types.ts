export interface EditDoctorRequest {
  address: string;
  phoneNumber: string;
  bio: string;
  workPhoneNumber: string;
  hospital: string;
  consultationFee: number | string;
}