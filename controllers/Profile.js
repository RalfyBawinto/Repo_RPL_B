import { getProfile, updateProfile } from "../models/UserModel.js"; // Import fungsi dari UserModel.js

// Endpoint untuk mengambil data profil pengguna
export const getProfileData = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getProfile(userId); // Ambil data profil pengguna
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint untuk memperbarui profil pengguna
export const updateProfileData = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  try {
    const updatedUser = await updateProfile(userId, name); // Perbarui nama pengguna
    res.json({ message: "Profil berhasil diperbarui", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
