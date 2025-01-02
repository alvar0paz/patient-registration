import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import { Patient } from './types/patient';
import { getPatients } from './api/patient';

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
      localStorage.setItem('patients', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to load patients:', error);
    }
  };

  const handleFormClose = () => setIsFormOpen(false);

  const handleFormSuccess = () => {
    fetchPatients();
    handleFormClose();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/2 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col items-center gap-6 mt-12 mb-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-12">Patient Registration</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Patient
          </button>
        </header>

        <PatientList patients={patients} />

        {isFormOpen && (
          <PatientForm onClose={handleFormClose} onSuccess={handleFormSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;
