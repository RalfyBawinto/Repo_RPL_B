import { LaporanKerusakan } from "../models"; // Pastikan import model dengan benar
import multer from "multer";
import path from "path";

// Setup untuk multer (untuk upload file gambar)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder tempat gambar akan disimpan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file gambar
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Membatasi ukuran file (misalnya 5MB)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Hanya file gambar dengan ekstensi jpg, jpeg, png, atau gif yang diperbolehkan"
        )
      );
    }
  },
});

// Controller untuk membuat laporan
export const createLaporan = (req, res) => {
  // Menggunakan multer untuk upload file
  upload.single("gambar")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Memeriksa apakah file berhasil diupload
    if (!req.file) {
      return res.status(400).json({ message: "File gambar wajib diunggah" });
    }

    const { name, subRole, alat, lokasi_ruangan, deskripsi_kerusakan } =
      req.body;
    const gambar = req.file.filename; // Mendapatkan nama file gambar yang diupload

    // Validasi data yang diterima
    if (!name || !subRole || !alat || !lokasi_ruangan || !deskripsi_kerusakan) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    try {
      // Simpan laporan kerusakan ke dalam database
      const newLaporan = await LaporanKerusakan.create({
        name,
        subRole,
        alat,
        lokasi_ruangan,
        deskripsi_kerusakan,
        gambar, // Simpan nama file gambar
      });

      res.status(201).json({
        message: "Laporan kerusakan berhasil dikirim",
        laporan: newLaporan,
      });
    } catch (error) {
      console.error("Error creating laporan:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat mengirim laporan kerusakan",
        error: error.message,
      });
    }
  });
};
