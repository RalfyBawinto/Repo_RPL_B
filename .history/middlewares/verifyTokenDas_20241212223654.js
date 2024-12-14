import jwt from "jsonwebtoken";

const verifyTokenDas = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Dekode token dan ambil data pengguna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Pastikan data pengguna disematkan ke dalam req.user
    req.user = decoded;
    next(); // Lanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default verifyTokenDas;
