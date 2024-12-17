import { DataTypes } from "sequelize";
import { db } from "../config/Database.js";
import Reservation from "../models/modelReservation.js"; // Mengimpor model Reservation

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Menambahkan asosiasi one-to-many: seorang user dapat memiliki banyak reservation
User.hasMany(Reservation, {
  foreignKey: "userId", // kolom yang digunakan untuk relasi
  as: "reservations", // nama alias untuk asosiasi
});

export default User;
