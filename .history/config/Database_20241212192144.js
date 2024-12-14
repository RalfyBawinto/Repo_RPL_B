import { Sequelize } from "sequelize";

const db = new Sequelize("management_lab_rpl_b", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Error connecting to the database:", error);
}

export default { db, connectDatabase };
