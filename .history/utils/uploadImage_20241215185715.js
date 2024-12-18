import multer from "multer";
import path from "path";

// Menentukan storage engine untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Menyimpan file di folder uploads
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Memberikan nama file unik menggunakan timestamp
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Membuat instance multer dengan konfigurasi storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Memfilter jenis file yang diizinkan (contoh hanya gambar)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diizinkan!"));
    }
  },
});

// Ekspor upload
export { upload };
