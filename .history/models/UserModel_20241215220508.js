import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

// Definisikan model Users
const Users = db.define(
  "Users", // Nama model (biasanya singular)
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Pastikan email unik
      allowNull: false, // Email tidak boleh kosong
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password tidak boleh kosong
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subRole: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Relasi: Seorang pengguna (user) bisa memiliki banyak reservasi
Users.associate = (models) => {
  Users.hasMany(models.Reservations, {
    foreignKey: "userId",
    as: "reservations", // Menentukan nama relasi
  });
};

// Fungsi untuk mendapatkan user berdasarkan ID
export const getUserById = async (userId) => {
  const user = await Users.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

export default Users;
