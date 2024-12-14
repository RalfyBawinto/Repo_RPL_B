import db from "../config/database.js"; // Pastikan path ini sesuai dengan konfigurasi database Anda

const createLabItemsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS lab_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lab_name VARCHAR(50) NOT NULL,
        item_name VARCHAR(50) NOT NULL,
        total INT NOT NULL,
        available INT NOT NULL,
        broken INT NOT NULL,
        under_repair INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("Table lab_items created or already exists.");
  } catch (error) {
    console.error("Error creating lab_items table:", error.message);
  }
};

// Panggil fungsi pembuatan tabel saat file ini diimpor
createLabItemsTable();

export default db;
