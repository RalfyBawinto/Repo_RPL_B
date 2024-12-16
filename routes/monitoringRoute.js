import express from "express";
import {
  getLabItems,
  addLabItem,
} from "../controllers/monitoringController.js";

const router = express.Router();

router.get("/monitoring", getLabItems);
router.post("/monitoring/add_item", addLabItem);

export default router;
