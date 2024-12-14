import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "localhost",
  username: "root",
  password: null,
  database: "db_rpl_b",
  dialect: "mysql",
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
