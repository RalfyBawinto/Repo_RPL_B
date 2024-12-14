import { db } from "../config/Database.js";
import lab_items from "../models/labItemModel.js";
import { io } from "../index.js"; // Pastikan untuk mengimpor io dari index.js

// Sinkronisasi database
const syncDatabase = async () => {
  try {
    await db.sync({ force: false }); // force: false berarti data yang sudah ada tidak akan dihapus
  } catch (error) {
    console.error("Error syncing database:", error.message);
  }
};

// Panggil syncDatabase saat aplikasi dimulai
syncDatabase();

// Endpoint untuk mendapatkan data alat berdasarkan lab_name
export const getLabItems = async (req, res) => {
  try {
    const { lab_name } = req.query; // Mengambil lab_name dari query string

    // Jika lab_name tidak diberikan, kirimkan seluruh data
    const condition = lab_name ? { lab_name } : {};

    const labItems = await lab_items.findAll({ where: condition });

    if (labItems.length === 0) {
      return res.status(404).json({ error: "No items found in the database" });
    }

    // Mapping ikon dan warna berdasarkan item_name
    const iconMapping = {
      Komputer: { icon: "🖥️", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      Keyboard: { icon: "⌨️", iconBg: "bg-red-100", iconColor: "text-red-600" },
      Mouse: { icon: "🖱️", iconBg: "bg-green-100", iconColor: "text-green-600"},
      Printer 3D: { icon: "🖨️", iconBg: "bg-blue-100", iconColor: "text-blue-600"},
    }

    // Kelompokkan data berdasarkan lab_name dan tambahkan properti ikon
    const groupedItems = labItems.reduce((acc, item) => {
      const { lab_name, item_name, available, broken, under_repair, total } =
        item;

      if (!acc[lab_name]) {
        acc[lab_name] = [];
      }

      acc[lab_name].push({
        item_name,
        total,
        available,
        broken,
        under_repair,
        ...(iconMapping[item_name] || {
          icon: "⚙️", // Ikon default
          iconBg: "bg-gray-100", // Background default
          iconColor: "text-gray-600", // Warna default
        }),
      });

      return acc;
    }, {});

    res.status(200).json(groupedItems); // Mengirimkan data terkelompok berdasarkan lab_name
  } catch (error) {
    console.error("Error fetching lab items:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint untuk menambahkan atau mengupdate data alat
export const addLabItem = async (req, res) => {
  try {
    const { lab_name, item_name, total, available, broken, under_repair } =
      req.body;

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

    const existingItem = await lab_items.findOne({
      where: { lab_name, item_name },
    });

    if (existingItem) {
      await existingItem.update({ total, available, broken, under_repair });

      io.emit("updateLabItems", {
        lab_name,
        items: [{ item_name, available, broken, under_repair, total }],
      });

      return res.status(200).json({
        message: "Item updated successfully",
        item: existingItem,
      });
    }

    const newItem = await lab_items.create({
      lab_name,
      item_name,
      total,
      available,
      broken,
      under_repair,
    });

    io.emit("updateLabItems", {
      lab_name,
      items: [{ item_name, available, broken, under_repair, total }],
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
