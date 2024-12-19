const mysql = require("mysql");

const db = new Sequelize({
  host: "brpmpi5gotsxcb8rilb5-mysql.services.clever-cloud.com",
  user: "ui5s6ak0acy97qne",
  password: "ui5s6ak0acy97qne",
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

db.connectDatabase;

(module = db), connectDatabase;
