import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

// Model untuk tabel reservations
const Reservations = db.define(
  "Reservations", // Nama model (biasanya singular)
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Nama model yang dirujuk, pastikan "Users" sesuai dengan nama model Users
        key: "id", // Kolom id pada tabel users
      },
      onDelete: "CASCADE", // Hapus reservasi jika user dihapus
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false, // Ruangan harus diisi
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false, // Tanggal harus diisi
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false, // Waktu mulai harus diisi
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false, // Waktu selesai harus diisi
    },
  },
  {
    tableName: "reservations", // Nama tabel
    timestamps: true, // Menambahkan kolom createdAt dan updatedAt
  }
);

// Relasi: Seorang pengguna (user) bisa memiliki banyak reservasi
Reservations.associate = (models) => {
  Reservations.belongsTo(models.Users, {
    foreignKey: "userId",
    as: "user", // Menentukan nama relasi
  });
};

export default Reservations;
