import express from "express";
import {
  getlabItems,
  addLabItem,
} from "../controllers/monitoringController.js";

const router = express.Router();

router.get("/", getlabItems);
router.post("/add_item", addLabItem);

export default router;
