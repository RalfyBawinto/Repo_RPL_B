import LaporanKerusakan from "../models/laporanModel.js";

export const createLaporan = async (req, res) => {
  const { nama_alat, lokasi_ruangan, deskripsi } = req.body;
  const foto = req.file ? req.file.filename : null;

  if (!nama_alat || !lokasi_ruangan || !deskripsi) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  try {
    const laporan = await LaporanKerusakan.create({
      nama_alat,
      lokasi_ruangan,
      deskripsi,
      foto,
    });
    res.status(201).json({ message: "Laporan berhasil dikirim.", laporan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengirim laporan." });
  }
};
