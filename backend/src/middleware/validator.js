import { body, validationResult } from 'express-validator';

export const validatePatient = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Name must contain only letters and spaces'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .matches(/@gmail\.com$/)
    .withMessage('Only @gmail.com emails are allowed'),

  body('countryCode')
    .trim()
    .notEmpty()
    .withMessage('Country code is required'),

  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d+$/)
    .withMessage('Phone number must contain only digits'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(({ param, msg }) => ({ field: param, message: msg })),
      });
    }
    next();
  },
];
