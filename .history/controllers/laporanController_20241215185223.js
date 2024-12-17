import LaporanKerusakan from "../models/laporanKerusakanModel.js";
import { uploadImage } from "../utils/uploadImage.js"; // Fungsi untuk menangani upload gambar

// Controller untuk membuat laporan kerusakan
export const createLaporan = async (req, res) => {
  const { name, subRole, alat, lokasi_ruangan, deskripsi_kerusakan } = req.body;
  const gambar = req.file; // Gambar yang di-upload

  // Pengecekan jika data yang dibutuhkan tidak ada
  if (
    !name ||
    !subRole ||
    !alat ||
    !lokasi_ruangan ||
    !deskripsi_kerusakan ||
    !gambar
  ) {
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
      gambar: gambar.filename, // Menyimpan nama file gambar yang disimpan
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
};
