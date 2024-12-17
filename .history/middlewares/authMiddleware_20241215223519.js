import cors from "cors";

// Middleware untuk CORS
export const corsMiddleware = cors({
  origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
});
