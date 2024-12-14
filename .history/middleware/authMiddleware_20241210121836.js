import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Token biasanya dikirim di header Authorization

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
        req.user = decoded; // Menyimpan data user dari token ke dalam req.user
        next(); // Melanjutkan ke route handler selanjutnya
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
