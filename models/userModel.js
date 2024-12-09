const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Pastikan path ini sesuai dengan file konfigurasi database kamu

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Menyimpan created_at dan updated_at otomatis
});

module.exports = User;
