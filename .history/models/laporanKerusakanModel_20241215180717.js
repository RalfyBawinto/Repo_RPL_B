import { Sequelize, DataTypes } from "sequelize";
import { db } from "./config/Database.js"; // Impor koneksi database Anda (sesuaikan dengan konfigurasi database)

const LaporanKerusakan = db.define(
  "LaporanKerusakan",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lokasi_ruangan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi_kerusakan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_waktu: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false, // Jika tidak ingin ada kolom createdAt dan updatedAt
  }
);

export default LaporanKerusakan;
