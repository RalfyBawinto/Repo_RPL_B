import express from "express";
import db from "./config/Database.js";
import router from "./routers/index.js";

const app = express();

    try {
        await db.authenticate();
        console.log('Database connection successful');
    } catch (error) {
        console.error(error);
    }

    app.use(express.json());
    app.use(router)

    // Menjalankan server
    app.listen(3001, () => console.log('Server is running on port 3001'));

