import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "brpmpi5gotsxcb8rilb5-mysql.services.clever-cloud.com",
  user: "ui5s6ak0acy97qne",
  password: "brpmpi5gotsxcb8rilb5",
  database: "brpmpi5gotsxcb8rilb5",
  dialect: "mysql", // Dialek yang digunakan (MySQL)
  port: 3306,
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
