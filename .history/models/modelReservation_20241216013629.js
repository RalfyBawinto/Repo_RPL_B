import { DataTypes } from "sequelize";
import { db } from "../config/Database.js";
import User from "./UserModel.js"; // Pastikan import User terlebih dahulu

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

// Pastikan asosiasi dilakukan setelah model didefinisikan
Reservation.belongsTo(User, {
  foreignKey: "userId",
  as: "user", // alias untuk asosiasi
});

export default Reservation;
