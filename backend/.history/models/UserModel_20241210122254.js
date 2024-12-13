import { Sequelize } from 'sequelize';
import { sequelize } from '../config/Database.js';
import bcrypt from 'bcryptjs';

const { DataTypes } = Sequelize;

const Users = sequelize.define(
  'users',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      validate: {
        notEmpty: true,
      },
    },
    subRole: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['Asisten Lab', 'Mahasiswa Umum']],
          msg: "Subrole must be either 'Asisten Lab' or 'Mahasiswa Umum'",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Hook untuk hashing password sebelum membuat user
Users.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Menambahkan fungsi untuk membandingkan password
Users.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default Users;
