import jwt from "jsonwebtoken";

const verifyTokenDas = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token:", token); // Debug token

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan data pengguna yang terverifikasi ke req.user
    console.log("Decoded:", decoded); // Debug decoded token
    next();
  } catch (error) {
    console.error("Token error:", error); // Debug error
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default verifyTokenDas;
