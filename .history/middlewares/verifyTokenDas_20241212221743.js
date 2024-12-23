import jwt from "jsonwebtoken";

const verifyTokenDas = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Mengambil token dari header

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = decoded; // Menyimpan data pengguna ke req.user
    next(); // Lanjutkan ke middleware berikutnya
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default verifyTokenDas;
