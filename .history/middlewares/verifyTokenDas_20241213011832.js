import jwt from "jsonwebtoken";

const verifyTokenDas = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token diterima:", token); // Debug token

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug decoded token
    req.user = decoded; // Menyimpan data pengguna ke req.user
    next();
  } catch (error) {
    console.error("Token error:", error); // Debug error
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default verifyTokenDas;
