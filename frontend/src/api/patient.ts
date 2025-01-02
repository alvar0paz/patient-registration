import axios from 'axios';
import { Patient, PatientFormData } from '../types/patient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPatient = async (formData: PatientFormData): Promise<Patient> => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('email', formData.email);
  data.append('countryCode', formData.countryCode);
  data.append('phoneNumber', formData.phoneNumber);
  if (formData.documentPhoto) {
    data.append('documentPhoto', formData.documentPhoto);
  }

  try {
    const response = await api.post<Patient>('/patients', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
