const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    comment: '脱发原因/防脱方法/用药指南/生活习惯'
  },
  content: {
    type: DataTypes.LONGTEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(100)
  },
  coverImage: {
    type: DataTypes.STRING(255)
  },
  tags: {
    type: DataTypes.JSON,
    comment: 'Array of tags'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'articles'
});

module.exports = Article;
