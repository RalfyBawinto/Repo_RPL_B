import { db } from "../config/database.js";
import lab_items from "../models/labItemModel.js"; // Mengimpor model LabItem
import { io } from "../index.js";

const syncDatabase = async () => {
  try {
    await db.sync({ force: false }); // force: false berarti tidak akan menghapus data yang sudah ada
  } catch (error) {
    console.error("Error syncing database:", error.message);
  }
};

// Panggil syncDatabase saat aplikasi dimulai
syncDatabase();

// Mendapatkan data alat berdasarkan lab
export const getLabItems = async (req, res) => {
  try {
    const { labName } = req.query; // Mendapatkan labName dari query string

    if (!labName) {
      return res.status(400).json({ error: "Lab name is required" }); // Validasi jika labName tidak ada
    }

    // Menggunakan Sequelize untuk mendapatkan data lab_items berdasarkan lab_name
    const labItems = await lab_items.findAll({
      where: { lab_name: labName }, // Kondisi pencarian berdasarkan lab_name
    });

    res.status(200).json(labItems); // Mengembalikan data dalam bentuk JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Mengembalikan error jika terjadi kesalahan
  }
};

// Menambahkan item alat baru
export const addLabItem = async (req, res) => {
  try {
    const { lab_name, item_name, total, available, broken, under_repair } =
      req.body;

    // Validasi data yang diterima
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

    // Menambahkan item alat baru ke dalam database
    const newItem = await lab_items.create({
      lab_name,
      item_name,
      total,
      available,
      broken,
      under_repair,
    });

    res.status(201).json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Error adding lab item:", error.message);
    res.status(500).json({ error: error.message });
  }
};
