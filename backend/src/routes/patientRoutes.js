import express from 'express';
import { createPatient, getPatients } from '../controllers/patientController.js';
import { validatePatient } from '../middleware/validator.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router
  .route('/')
  .get(getPatients)
  .post(upload.single('documentPhoto'), validatePatient, createPatient);

export default router;
