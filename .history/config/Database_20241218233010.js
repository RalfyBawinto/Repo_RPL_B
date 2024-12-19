import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const db = new Sequelize({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  port: process.env.DB_PORT,
});

const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export { db, connectDatabase };
