import { Sequelize } from "sequelize";

// Koneksi ke database
const db = new Sequelize({
  host: "localhost",
  username: "root",
  password: null,
  database: "db_rpl_b",
  dialect: "mysql",
  port: 3307,
  logging: false, // Tutup log ketika melakukan koneksi ke database
});

// Fungsi untuk menghubungkan dan menyinkronkan database
const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");

    // Sinkronisasi model dengan database
    await db.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// Ekspor db dan connectDatabase
export { db, connectDatabase };
