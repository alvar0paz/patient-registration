import Patient from '../models/Patient.js';
import { sendConfirmationEmail } from '../services/emailService.js';

export const createPatient = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Document photo is required' });
    }

    const { body, file } = req;

    const patient = await Patient.create({
      ...body,
      documentPhoto: file.filename,
    });

    sendConfirmationEmail(patient.email, patient.name).catch((err) =>
      console.error('Error sending confirmation email:', err)
    );

    return res.status(201).json(patient);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        errors: error.errors.map(({ message }) => ({ msg: message })),
      });
    }

    console.error('Error creating patient:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPatients = async (_req, res) => {
  try {
    const patients = await Patient.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
