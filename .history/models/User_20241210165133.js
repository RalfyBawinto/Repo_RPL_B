const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    subRole: { type: DataTypes.STRING, allowNull: true },
});

module.exports = User;