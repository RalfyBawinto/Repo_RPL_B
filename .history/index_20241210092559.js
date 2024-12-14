import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credential: true,
    origin: 'http://localhost:3000'
}));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})