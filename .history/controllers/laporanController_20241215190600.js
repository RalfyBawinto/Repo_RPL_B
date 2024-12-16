export const createLaporan = (req, res) => {
  upload.single("gambar")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    console.log(req.file); // Memeriksa apakah file ada di sini

    const { name, subRole, alat, lokasi_ruangan, deskripsi_kerusakan } =
      req.body;
    const gambar = req.file; // Gambar yang di-upload

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
        gambar: gambar.filename, // Nama file gambar yang disimpan
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
