import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "Users",
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

// Fungsi untuk mengambil data profil berdasarkan ID
export const getProfile = async (userId) => {
  try {
    const user = await Users.findByPk(userId); // Menggunakan Sequelize untuk mendapatkan data pengguna berdasarkan primary key (ID)
    return user;
  } catch (err) {
    throw new Error("Terjadi kesalahan saat mengambil data profil");
  }
};

// Fungsi untuk memperbarui nama pengguna
export const updateProfile = async (userId, name) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      throw new Error("Pengguna tidak ditemukan");
    }
    user.name = name; // Update nama pengguna
    await user.save(); // Simpan perubahan ke database
    return user;
  } catch (err) {
    throw new Error("Terjadi kesalahan saat memperbarui profil");
  }
};

export default Users;
