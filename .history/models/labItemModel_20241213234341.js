import { Sequelize, DataTypes } from "sequelize"; // Pastikan Sequelize diimpor
import { db } from "../config/database.js"; // Pastikan koneksi Sequelize

const lab_items = db.define(
  "lab_items",
  {
    lab_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    broken: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    under_repair: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Menggunakan Sequelize.NOW untuk default CURRENT_TIMESTAMP
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Menggunakan Sequelize.NOW untuk default CURRENT_TIMESTAMP
      onUpdate: Sequelize.NOW, // Menetapkan waktu pembaruan otomatis
    },
  },
  {
    tableName: "lab_items",
    timestamps: true, // Akan membuat field `created_at` dan `updated_at`
  }
);

export default lab_items;
