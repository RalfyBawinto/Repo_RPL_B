import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

// Model untuk tabel reservations
const Reservations = db.define(
  "Reservations",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Nama tabel yang dirujuk
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

export default Reservations;
