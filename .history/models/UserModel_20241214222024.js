import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

export const getUserById = async (id) => {
  const [rows] = await db.query("SELECT name, role FROM Users WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

const Users = db.define(
  "Users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Pastikan email unik
      allowNull: false, // Email tidak boleh kosong
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password tidak boleh kosong
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subRole: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default Users;
