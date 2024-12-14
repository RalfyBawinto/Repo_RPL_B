import jwt from "jsonwebtoken";

const verifyTokenDas = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Debug untuk melihat token
  console.log("Token:", token);

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Menyimpan data pengguna ke req.user
    req.user = decoded;
    console.log("Decoded:", decoded); // Debug decoded token

    // Melanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    console.error("Token error:", error); // Debug error

    // Menangani error lebih detail
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
};

export default verifyTokenDas;
