import { db, connectDatabase } from "../config/database.js";
import { io } from "../index.js";

export const getLabItems = async (req, res) => {
  try {
    const { labName } = req.query; // Mendapatkan labName dari query string

    if (!labName) {
      return res.status(400).json({ error: "Lab name is required" }); // Validasi jika labName tidak ada
    }

    // Query untuk mendapatkan data alat berdasarkan lab_name
    const [rows] = await db.query(
      "SELECT * FROM lab_items WHERE lab_name = ?",
      [labName] // Mengikat parameter labName pada query
    );

    res.status(200).json(rows); // Mengembalikan data dalam bentuk JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Mengembalikan error jika terjadi kesalahan
  }
};

export const addLabItem = async (req, res) => {
  try {
    const { lab_name, item_name, total, available, broken, under_repair } =
      req.body;

    // Log data yang diterima untuk debugging
    console.log("Received data:", req.body);

    // Validasi jika ada data yang kosong
    if (
      !lab_name ||
      !item_name ||
      total === undefined ||
      available === undefined ||
      broken === undefined ||
      under_repair === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Menambahkan item baru ke dalam database
    const result = await db.query(
      "INSERT INTO lab_items (lab_name, item_name, total, available, broken, under_repair) VALUES (?, ?, ?, ?, ?, ?)",
      [lab_name, item_name, total, available, broken, under_repair] // Pastikan data terikat dengan benar
    );

    // Mengambil data terbaru untuk lab_name yang sesuai
    const [updatedData] = await db.query(
      "SELECT * FROM lab_items WHERE lab_name = ?",
      [lab_name]
    );

    // Mengirimkan data terbaru ke semua klien yang terhubung melalui socket.io
    io.emit("updateLabItems", { lab_name, items: updatedData });

    res
      .status(201)
      .json({ message: "Item added successfully", id: result[0].insertId });
  } catch (error) {
    console.error("Error adding lab item:", error.message);
    res.status(500).json({ error: error.message });
  }

  // Pastikan untuk memanggil connectDatabase untuk memeriksa koneksi
  connectDatabase().catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Jika koneksi gagal, aplikasi akan dihentikan
  });
};
