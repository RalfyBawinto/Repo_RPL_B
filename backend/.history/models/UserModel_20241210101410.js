import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import bcrypt from 'bcryptjs';

const { DataTypes } = Sequelize;

const User = db.define('users', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Enkripsi password sebelum menyimpan ke database
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Bandingkan password yang dimasukkan dengan password yang ada di database
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
