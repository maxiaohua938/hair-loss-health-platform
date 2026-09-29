const sequelize = require('../config/database');
const User = require('./User');
const SleepRecord = require('./SleepRecord');
const MedicationPlan = require('./MedicationPlan');
const MedicationRecord = require('./MedicationRecord');
const Article = require('./Article');
const UserFavorite = require('./UserFavorite');

// Define associations
User.hasMany(SleepRecord, { foreignKey: 'userId', onDelete: 'CASCADE' });
SleepRecord.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(MedicationPlan, { foreignKey: 'userId', onDelete: 'CASCADE' });
MedicationPlan.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(MedicationRecord, { foreignKey: 'userId', onDelete: 'CASCADE' });
MedicationRecord.belongsTo(User, { foreignKey: 'userId' });

MedicationPlan.hasMany(MedicationRecord, { foreignKey: 'planId', onDelete: 'CASCADE' });
MedicationRecord.belongsTo(MedicationPlan, { foreignKey: 'planId' });

User.belongsToMany(Article, { through: UserFavorite, foreignKey: 'userId' });
Article.belongsToMany(User, { through: UserFavorite, foreignKey: 'articleId' });

module.exports = {
  sequelize,
  User,
  SleepRecord,
  MedicationPlan,
  MedicationRecord,
  Article,
  UserFavorite
};
