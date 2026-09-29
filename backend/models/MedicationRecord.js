const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicationRecord = sequelize.define('MedicationRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recordDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  remindTime: {
    type: DataTypes.TIME,
    allowNull: false,
    comment: 'Original remind time'
  },
  actualTime: {
    type: DataTypes.TIME,
    comment: 'When user actually took the medication'
  },
  status: {
    type: DataTypes.ENUM('taken', 'missed', 'pending'),
    defaultValue: 'pending'
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
  tableName: 'medication_records',
  indexes: [{
    unique: true,
    fields: ['planId', 'recordDate', 'remindTime']
  }]
});

module.exports = MedicationRecord;
