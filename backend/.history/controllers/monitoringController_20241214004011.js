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

// Endpoint untuk mendapatkan data alat per lab
export const getLabItems = async (req, res) => {
  try {
    const { labName } = req.query; // Ambil labName dari query parameter

    if (!labName) {
      return res.status(400).json({ error: "Lab name is required" });
    }

    // Ambil data alat berdasarkan lab_name
    const labItems = await lab_items.findAll({
      where: { lab_name: labName },
    });

    // Jika tidak ada data alat di lab tersebut
    if (labItems.length === 0) {
      return res
        .status(404)
        .json({ error: `No items found for lab ${labName}` });
    }

    // Kelompokkan data alat berdasarkan item_name
    const result = labItems.reduce((acc, item) => {
      const { item_name, available, broken, under_repair, total } = item;

      if (!acc[item_name]) {
        acc[item_name] = {
          item_name,
          total: 0,
          available: 0,
          broken: 0,
          under_repair: 0,
        };
      }

      // Tambahkan data untuk setiap alat
      acc[item_name].total += total;
      acc[item_name].available += available;
      acc[item_name].broken += broken;
      acc[item_name].under_repair += under_repair;

      return acc;
    }, {});

    // Konversi objek hasil menjadi array
    const formattedItems = Object.values(result);

    // Kirimkan data dalam format yang terstruktur
    res.status(200).json({
      lab_name: labName,
      items: formattedItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
