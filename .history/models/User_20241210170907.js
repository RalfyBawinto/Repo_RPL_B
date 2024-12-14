import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';  // Pastikan menambahkan ekstensi .js

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    subRole: { type: DataTypes.STRING, allowNull: true },
});

export default User;