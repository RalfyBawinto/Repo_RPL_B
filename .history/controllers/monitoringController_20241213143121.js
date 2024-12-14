import db from "../config/database.js"; // Pastikan file ini terhubung dengan database

export const getLabItems = async (req, res) => {
  try {
    const { labName } = req.query;
    const [rows] = await db.query(
      "SELECT * FROM lab_items WHERE lab_name = ?",
      [labName]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addLabItem = async (req, res) => {
  try {
    const { lab_name, item_name, total, available, broken, under_repair } =
      req.body;
    const result = await db.query(
      "INSERT INTO lab_items (lab_name, item_name, total, available, broken, under_repair) VALUES (?, ?, ?, ?, ?, ?)",
      [lab_name, item_name, total, available, broken, under_repair]
    );
    res
      .status(201)
      .json({ message: "Item added successfully", id: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
