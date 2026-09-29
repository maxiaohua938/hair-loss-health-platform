const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicationPlan = sequelize.define('MedicationPlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  drugName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dosage: {
    type: DataTypes.STRING(100)
  },
  usage: {
    type: DataTypes.STRING(200),
    comment: 'e.g. 口服, 外用'
  },
  remindTimes: {
    type: DataTypes.JSON,
    comment: 'Array of remind times, e.g. ["08:00", "20:00"]'
  },
  frequency: {
    type: DataTypes.STRING(50),
    comment: 'daily, weekly, custom',
    defaultValue: 'daily'
  },
  frequencyDetails: {
    type: DataTypes.JSON,
    comment: 'For weekly: [1,3,5] for Mon,Wed,Fri'
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    comment: 'NULL for long-term medication'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  notes: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  tableName: 'medication_plans'
});

module.exports = MedicationPlan;
