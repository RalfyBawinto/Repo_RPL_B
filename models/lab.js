'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lab extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Lab.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Lab',
    }
  );
  return Lab;
};
