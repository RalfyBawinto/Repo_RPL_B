import bodyParser from "body-parser";
import cors from "cors";

// Middleware untuk parsing JSON dan form-urlencoded
export const bodyParserMiddleware = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];

// Middleware untuk CORS
export const corsMiddleware = cors({
  origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
});
import cors from "cors";

// Middleware untuk CORS
export const corsMiddleware = cors({
  origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
});
