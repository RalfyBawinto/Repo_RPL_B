import { DataTypes } from "sequelize";
import { db } from "../config/Database.js";
import User from "./User.js"; // Mengimpor model User

const Reservation = db.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Menambahkan asosiasi one-to-many: setiap reservation dimiliki oleh satu user
Reservation.belongsTo(User, {
  foreignKey: "userId", // kolom yang digunakan untuk relasi
  as: "user", // nama alias untuk asosiasi
});

export default Reservation;
