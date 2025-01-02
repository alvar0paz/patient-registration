import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z\s]*$/,
        msg: 'Name must contain only letters and spaces',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Invalid email format',
      },
      is: {
        args: /@gmail\.com$/,
        msg: 'Only @gmail.com emails are allowed',
      },
    },
  },
  countryCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Country code is required',
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^\d+$/,
        msg: 'Phone number must contain only digits',
      },
    },
  },
  documentPhoto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Document photo is required',
      },
    },
  },
});

export default Patient;
