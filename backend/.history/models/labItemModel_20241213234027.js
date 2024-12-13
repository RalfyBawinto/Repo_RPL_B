import { DataTypes } from "sequelize";
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
      type: DataTypes.TIMESTAMP,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.TIMESTAMP,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    tableName: "lab_items",
    timestamps: true, // Akan membuat field `created_at` dan `updated_at`
  }
);

export default lab_items;
