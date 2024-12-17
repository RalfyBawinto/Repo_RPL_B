import express from "express";
import {
  getLabItems,
  addLabItem,
} from "../controllers/monitoringController.js";

const router = express.Router();

// Rute untuk mendapatkan data alat berdasarkan lab_name
router.get("/", getLabItems);

// Rute untuk menambahkan atau mengupdate item
router.post("/add_item", addLabItem);

export default router;
