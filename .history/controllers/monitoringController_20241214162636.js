import { db } from "../config/Database.js";
import lab_items from "../models/labItemModel.js"; // Mengimpor model LabItem
import { io } from "../index.js";

// Sinkronisasi database
const syncDatabase = async () => {
  import { db } from "../config/Database.js";
  import lab_items from "../models/labItemModel.js"; // Mengimpor model LabItem
  import { io } from "../index.js";

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

  // Endpoint untuk mendapatkan semua data alat lab
  export const getLabItems = async (req, res) => {
    try {
      // Ambil semua data alat dari database
      const labItems = await lab_items.findAll();

      if (labItems.length === 0) {
        return res
          .status(404)
          .json({ error: "Tidak ada data alat di database" });
      }

      // Kelompokkan data berdasarkan lab_name
      const groupedItems = labItems.reduce((acc, item) => {
        const { lab_name, item_name, available, broken, under_repair, total } =
          item;

        if (!acc[lab_name]) {
          acc[lab_name] = [];
        }

        // Tambahkan data item ke lab_name terkait
        acc[lab_name].push({
          item_name,
          total,
          available,
          broken,
          under_repair,
        });

        return acc;
      }, {});

      // Kirimkan data dalam format yang terstruktur
      res.status(200).json(groupedItems);
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

      // Validasi data input
      if (
        !lab_name ||
        !item_name ||
        total === undefined ||
        available === undefined ||
        broken === undefined ||
        under_repair === undefined
      ) {
        return res.status(400).json({ error: "Semua field harus diisi" });
      }

      // Cek apakah kombinasi lab_name dan item_name sudah ada
      const existingItem = await lab_items.findOne({
        where: { lab_name, item_name },
      });

      if (existingItem) {
        // Jika item sudah ada, perbarui kolom lainnya
        await existingItem.update({ total, available, broken, under_repair });

        // Emit data yang diperbarui ke semua klien
        io.emit("updateLabItems", {
          lab_name,
          items: [
            {
              item_name,
              available,
              broken,
              under_repair,
              total,
            },
          ],
        });

        return res.status(200).json({
          message: "Item berhasil diperbarui",
          item: existingItem,
        });
      }

      // Jika item belum ada, tambahkan item baru
      const newItem = await lab_items.create({
        lab_name,
        item_name,
        total,
        available,
        broken,
        under_repair,
      });

      // Emit data item yang baru ditambahkan ke semua klien
      io.emit("updateLabItems", {
        lab_name,
        items: [
          {
            item_name,
            available,
            broken,
            under_repair,
            total,
          },
        ],
      });

      res.status(201).json({
        message: "Item berhasil ditambahkan",
        item: newItem,
      });
    } catch (error) {
      console.error("Error adding lab item:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  try {
    await db.sync({ force: false }); // force: false berarti tidak akan menghapus data yang sudah ada
  } catch (error) {
    console.error("Error syncing database:", error.message);
  }
};

// Panggil syncDatabase saat aplikasi dimulai
syncDatabase();

// Endpoint untuk mendapatkan data semua lab dan alatnya
export const getLabItems = async (req, res) => {
  try {
    // Ambil semua data alat dari tabel lab_items
    const labItems = await lab_items.findAll();

    if (labItems.length === 0) {
      return res.status(404).json({ error: "No items found in the database" });
    }

    // Kelompokkan data berdasarkan lab_name
    const groupedItems = labItems.reduce((acc, item) => {
      const { lab_name, item_name, available, broken, under_repair, total } =
        item;

      if (!acc[lab_name]) {
        acc[lab_name] = [];
      }

      // Tambahkan data item ke lab_name terkait
      acc[lab_name].push({
        item_name,
        total,
        available,
        broken,
        under_repair,
      });

      return acc;
    }, {});

    // Kirimkan data dalam format terstruktur
    res.status(200).json(groupedItems);
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

    // Validasi data input
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

    // Cek apakah kombinasi lab_name dan item_name sudah ada
    const existingItem = await lab_items.findOne({
      where: { lab_name, item_name },
    });

    if (existingItem) {
      // Jika item sudah ada, perbarui kolom lainnya
      await existingItem.update({ total, available, broken, under_repair });

      // Emit data yang diperbarui ke semua klien
      io.emit("updateLabItems", {
        lab_name,
        items: [{ item_name, available, broken, under_repair, total }],
      });

      return res.status(200).json({
        message: "Item updated successfully",
        item: existingItem,
      });
    }

    // Jika item belum ada, tambahkan item baru
    const newItem = await lab_items.create({
      lab_name,
      item_name,
      total,
      available,
      broken,
      under_repair,
    });

    // Emit data yang ditambahkan ke semua klien
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
