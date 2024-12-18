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

// Sinkronisasi tabel
(async () => {
  try {
    await db.sync();
    console.log("Tabel Laporan Kerusakan berhasil disinkronisasi.");
  } catch (error) {
    console.error("Error sinkronisasi tabel:", error);
  }
})();

export default LaporanKerusakan;
