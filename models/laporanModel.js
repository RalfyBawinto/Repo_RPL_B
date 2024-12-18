import { DataTypes } from "sequelize";
import { db } from "../config/Database.js";

const LaporanKerusakan = db.define(
  "LaporanKerusakan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_alat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lokasi_ruangan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true, // Foto opsional
    },
  },
  {
    tableName: "laporan_kerusakan",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default LaporanKerusakan;
