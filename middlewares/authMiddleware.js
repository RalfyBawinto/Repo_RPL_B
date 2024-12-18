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

import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'SECRET_KEY'); // Ganti 'SECRET_KEY' dengan key Anda
      req.user = decoded; // Menyimpan data user dari token
      next();
    } catch (error) {
      return res.status(401).json({ status: 'error', message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
  }
};

