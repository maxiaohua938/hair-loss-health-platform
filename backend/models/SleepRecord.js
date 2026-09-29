const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SleepRecord = sequelize.define('SleepRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recordDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  bedTime: {
    type: DataTypes.TIME
  },
  wakeTime: {
    type: DataTypes.TIME
  },
  sleepDuration: {
    type: DataTypes.DECIMAL(5, 2),
    comment: 'Sleep duration in hours'
  },
  quality: {
    type: DataTypes.STRING(50),
    comment: '优秀/良好/一般/较差'
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
  tableName: 'sleep_records',
  indexes: [{
    unique: true,
    fields: ['userId', 'recordDate']
  }]
});

module.exports = SleepRecord;
