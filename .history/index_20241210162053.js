import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

// Memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();

// Menggunakan middleware untuk parsing JSON body
app.use(express.json());

// Pengaturan session
app.use(session({
    secret: process.env.SESSION_SECRET,  // Pastikan SESSION_SECRET ada di .env
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',  // Setel secure ke true hanya di production
        httpOnly: true, // Untuk keamanan, hanya dapat diakses oleh server
        maxAge: 60 * 60 * 1000 // Cookie valid selama 1 jam
    }
}));

// Pengaturan CORS
app.use(cors({
    origin: 'http://localhost:3000',  // URL frontend Anda
    credentials: true  // Memberikan izin untuk mengirim cookies
}));

// Menyediakan endpoint untuk menguji
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Menjalankan server
const port = process.env.APP_PORT || 5001;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
});
