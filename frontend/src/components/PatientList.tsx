import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Patient } from '../types/patient';

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (patientId: string) => {
    setImageErrors((prev) => new Set(prev).add(patientId));
  };

  const toggleExpand = (patientId: string) => {
    setExpandedId((prev) => (prev === patientId ? null : patientId));
  };

  if (!patients.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No patients registered yet.</p>
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg shadow-md h-fit"
          >
            <div
              onClick={() => toggleExpand(patient.id)}
              className="cursor-pointer p-4"
            >
              <div className="flex items-center space-x-4">
                {imageErrors.has(patient.id) ? (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${patient.documentPhoto}`}
                    alt="Document"
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                    onError={() => handleImageError(patient.id)}
                  />
                )}
                <h3 className="font-medium text-lg truncate flex-1">{patient.name}</h3>
              </div>
            </div>
            
            <AnimatePresence initial={false}>
              {expandedId === patient.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                  className="border-t border-gray-100"
                >
                  <div className="bg-gray-50 p-4 space-y-2">
                    <div className="flex">
                      <span className="font-medium flex-shrink-0">Email:&nbsp;</span>
                      <span className="truncate">{patient.email}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium flex-shrink-0">Phone:&nbsp;</span>
                      <span className="truncate">{patient.countryCode} {patient.phoneNumber}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium flex-shrink-0">Registered:&nbsp;</span>
                      <span className="truncate">
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
