import multer from "multer";
import path from "path";

// Set konfigurasi penyimpanan file gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder untuk menyimpan file gambar
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Menggunakan timestamp sebagai nama file
  },
});

const fileFilter = (req, file, cb) => {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  if (
    !validExtensions.includes(path.extname(file.originalname).toLowerCase())
  ) {
    return cb(new Error("Hanya file gambar yang diizinkan"), false);
  }
  cb(null, true);
};

// Inisialisasi multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // Max file size 100MB
  },
});

export const uploadImage = upload.single("gambar"); // Untuk upload gambar
