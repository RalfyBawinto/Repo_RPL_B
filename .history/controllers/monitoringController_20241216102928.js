import { db } from "../config/Database.js";
import lab_items from "../models/labItemModel.js";
import { io } from "../index.js";

// Endpoint untuk mendapatkan data alat berdasarkan lab_name
export const getLabItems = async (req, res) => {
  try {
    const { lab_name } = req.query;

    const condition = lab_name ? { lab_name } : {}; // Filter berdasarkan lab_name

    const labItems = await lab_items.findAll({ where: { lab_name } });
    io.emit("updateLabItems", { [lab_name]: labItems });

    if (!labItems.length) {
      return res.status(404).json({ error: "No items found in the database" });
    }

    const iconMapping = {
      Komputer: {
        icon: "🖥️",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      Keyboard: {
        icon: "⌨️",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      Mouse: {
        icon: "🖱️",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      "Printer 3D": {
        icon: "🖨️",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
    };

    const groupedItems = labItems.reduce((acc, item) => {
      const { lab_name, item_name, available, broken, under_repair } = item;
      const total = available + broken + under_repair;

      if (!acc[lab_name]) acc[lab_name] = [];

      acc[lab_name].push({
        item_name,
        total,
        available,
        broken,
        under_repair,
        ...(iconMapping[item_name] || {
          icon: "⚙️",
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
        }),
      });

      return acc;
    }, {});

    res.status(200).json(groupedItems); // Mengirim data terkelompok berdasarkan lab_name
  } catch (error) {
    console.error("Error fetching lab items:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Endpoint untuk menambahkan atau mengupdate data alat
export const addLabItem = async (req, res) => {
  try {
    const { lab_name, item_name, available, broken, under_repair } = req.body;

    if (
      !lab_name ||
      !item_name ||
      available === undefined ||
      broken === undefined ||
      under_repair === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const total = available + broken + under_repair;

    const existingItem = await lab_items.findOne({
      where: { lab_name, item_name },
    });

    if (existingItem) {
      await existingItem.update({ available, broken, under_repair, total });

      io.emit("updateLabItems", { lab_name, item: existingItem });

      return res.status(200).json({
        message: "Item updated successfully",
        item: existingItem,
      });
    }

    const newItem = await lab_items.create({
      lab_name,
      item_name,
      available,
      broken,
      under_repair,
      total,
    });

    io.emit("updateLabItems", { lab_name, item: newItem });

    res.status(201).json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Error adding lab item:", error.message);
    res.status(500).json({ error: error.message });
  }
};
