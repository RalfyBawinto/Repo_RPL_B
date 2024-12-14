import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "localhost",
  username: "root",
  password: null,
  database: "management_lab_rpl_b",
  dialect: "mysql",
  port: 3007,
});

const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export { connectDatabase };
