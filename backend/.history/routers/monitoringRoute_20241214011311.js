import express from "express";
import {
  getLabItems,
  addLabItem,
} from "../controllers/monitoringController.js";

const router = express.Router();

router.get("/", getLabItems);
router.post("/add_item", addLabItem);

export default router;
