import { db } from "../config/database.js";
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

    // Validasi data yang dikirim dalam body
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

    // Query untuk menambahkan item baru ke lab_items
    const result = await db.query(
      "INSERT INTO lab_items (lab_name, item_name, total, available, broken, under_repair) VALUES (?, ?, ?, ?, ?, ?)",
      [lab_name, item_name, total, available, broken, under_repair] // Mengikat data ke dalam query
    );

    // Setelah menambah, mengambil data terbaru untuk lab_name tersebut
    const [updatedData] = await db.query(
      "SELECT * FROM lab_items WHERE lab_name = ?",
      [lab_name]
    );

    // Emit data terbaru ke semua klien yang terhubung
    io.emit("updateLabItems", { lab_name, items: updatedData });

    res
      .status(201)
      .json({ message: "Item added successfully", id: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
