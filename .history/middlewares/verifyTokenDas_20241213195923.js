import crypto from "crypto";

export const authenticateJWT = async (req, res, next) => {
  let token = req.headers["authorization"]?.split(" ")[1]; // Ambil token dari header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifikasi token (diubah menjadi format custom)
    const user = await verifyCustomToken(token);

    // Jika token valid, lanjutkan
    req.user = user; // Menyimpan informasi user ke dalam req.user
    next();
  } catch (err) {
    if (err.message === "Token expired") {
      // Buat token baru jika token kedaluwarsa
      const newToken = generateCustomToken(req.user.id, req.user.role);
      return res.status(200).json({
        message: "Token expired, new token issued",
        newToken,
      });
    } else {
      // Jika token tidak valid, kirim error
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }
};

// Fungsi untuk memverifikasi token (custom)
const verifyCustomToken = async (token) => {
  const tokenData = myTokenStore[token]; // Ambil data token dari storage (bisa database atau in-memory store)
  if (!tokenData) throw new Error("Invalid token");

  // Cek jika token expired
  if (Date.now() > tokenData.expiresAt) {
    throw new Error("Token expired");
  }

  return tokenData.user; // Kembalikan data user jika token valid
};

// Fungsi untuk membuat token acak 4-6 karakter
export const generateCustomToken = (userId, role) => {
  const token = crypto.randomBytes(3).toString("hex"); // Membuat token acak 6 karakter (3 byte = 6 hex)
  myTokenStore[token] = {
    user: { id: userId, role },
    expiresAt: Date.now() + 3600000, // 1 jam
  };
  return token;
};

// Contoh penyimpanan token (gunakan database atau cache seperti Redis di aplikasi nyata)
const myTokenStore = {};

export default verifyTokenDas;
