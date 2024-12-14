import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/Database.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Mahasiswa Umum',
    },
    subRole: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
});

export default User;
