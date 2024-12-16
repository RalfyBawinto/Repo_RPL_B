import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("File akan disimpan di folder uploads"); // Log untuk debugging
    cb(null, "uploads/"); // Folder tempat file akan disimpan
  },
  filename: (req, file, cb) => {
    console.log("Nama file asli:", file.originalname); // Log nama file asli
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimum ukuran file 5MB
  },
  fileFilter: (req, file, cb) => {
    console.log("Memeriksa tipe file:", file.mimetype); // Log tipe file
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diperbolehkan!"), false);
    }
  },
});

export { upload };
