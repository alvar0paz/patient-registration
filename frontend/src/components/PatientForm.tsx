import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { PatientFormData } from '../types/patient';
import { createPatient } from '../api/patient';

interface PatientFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    documentPhoto: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!/^[a-zA-Z\s]*$/.test(formData.name)) newErrors.name = 'Name must contain only letters and spaces';
    if (!formData.email.endsWith('@gmail.com')) newErrors.email = 'Only @gmail.com emails are allowed';
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.documentPhoto) newErrors.documentPhoto = 'Document photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFormData((prev) => ({ ...prev, documentPhoto: acceptedFiles[0] }));
      setErrors((prev) => ({ ...prev, documentPhoto: '' }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createPatient(formData);
      setSubmitStatus('success');
      setTimeout(onSuccess, 1500);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-lg p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name', type: 'text', value: formData.name, error: errors.name, placeholder: 'Enter patient name', onChange: (value: string) => ({ name: value }) },
            { label: 'Email', type: 'email', value: formData.email, error: errors.email, placeholder: 'example@gmail.com', onChange: (value: string) => ({ email: value }) },
            { label: 'Country Code', type: 'text', value: formData.countryCode, error: errors.countryCode, placeholder: '+1', onChange: (value: string) => ({ countryCode: value }) },
            { label: 'Phone Number', type: 'tel', value: formData.phoneNumber, error: errors.phoneNumber, placeholder: '123456789', onChange: (value: string) => ({ phoneNumber: value }) },
          ].map(({ label, type, value, error, placeholder, onChange }, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setFormData((prev) => ({ ...prev, ...onChange(e.target.value) }))}
                className={`p-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
                placeholder={placeholder}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Document Photo</label>
            <div {...getRootProps()} className={`mt-1 border-2 border-dashed rounded-md p-6 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
              <input {...getInputProps()} />
              <p className="text-center text-gray-600">{formData.documentPhoto ? formData.documentPhoto.name : 'Drop your document photo here, or click to select'}</p>
            </div>
            <AnimatePresence>
              {errors.documentPhoto && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-sm text-red-500 mt-1"
                >
                  {errors.documentPhoto}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={onClose} type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        <AnimatePresence>
          {submitStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div className="bg-white p-6 rounded-lg">
                {submitStatus === 'success' ? 'Patient registered successfully!' : 'Error registering patient. Please try again.'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PatientForm;
