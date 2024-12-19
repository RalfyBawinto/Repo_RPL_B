// In your backend (e.g., api/notifications.js)
import express from "express";
import Notification from "./models/notification"; // Assuming you have a Notification model

const router = express.Router();

// Sample route to fetch all notifications
router.get("/notifications", async (req, res) => {
  try {
    // Fetch notifications from database (here using a static array for demonstration)
    const notifications = [
      {
        id: 1,
        type: "reservasi",
        icon: "calendar",
        title: "Halo, Sarazel!",
        message: "Reservasi Anda untuk LAB...",
        time: "3m",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
      },
      {
        id: 2,
        type: "pemeliharaan",
        icon: "tools",
        title: "Pemberitahuan Pemeliharaan",
        message: "Jadwal pemeliharaan untuk alat XYZ...",
        time: "10m",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
      },
      {
        id: 3,
        type: "laporan",
        icon: "check-circle",
        title: "Laporan Diterima",
        message: "Laporan kerusakan alat ABC telah diterima...",
        time: "1h",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
      },
    ];

    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
