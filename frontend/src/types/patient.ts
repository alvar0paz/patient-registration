export interface Patient {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientFormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: File | null;
}
