// /controllers/authController.js
import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Debugging: Log input password and stored password hash
        console.log('Password input:', password);
        console.log('Stored password hash:', user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ uuid: user.uuid, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { 
                uuid: user.uuid,
                username: user.username,
                email: user.email,
                role: user.role,
                subRole: user.subRole,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const signUpUser = async (req, res) => {
    const { username, email, password, role, subRole } = req.body;

    if (!username || !email || !password || !role || !subRole) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
            role,
            subRole
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
