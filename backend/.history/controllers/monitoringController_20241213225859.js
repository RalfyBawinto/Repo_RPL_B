import { db } from "../config/database.js";
import LabItem from "../models/labItemModel.js"; // Mengimpor model LabItem
import { io } from "../index.js";

const syncDatabase = async () => {
  try {
    await db.sync({ force: false }); // force: false berarti tidak akan menghapus data yang sudah ada
    console.log("Database & tables created or already exist.");
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
    const labItems = await LabItem.findAll({
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

    // Menambahkan item baru ke dalam database menggunakan Sequelize
    const newLabItem = await LabItem.create({
      lab_name,
      item_name,
      total,
      available,
      broken,
      under_repair,
    });

    // Mengambil data terbaru untuk lab_name yang sesuai
    const updatedData = await LabItem.findAll({
      where: { lab_name },
    });

    // Mengirimkan data terbaru ke semua klien yang terhubung melalui socket.io
    io.emit("updateLabItems", { lab_name, items: updatedData });

    res
      .status(201)
      .json({ message: "Item added successfully", id: newLabItem.id });
  } catch (error) {
    console.error("Error adding lab item:", error.message);
    res.status(500).json({ error: error.message });
  }
};
