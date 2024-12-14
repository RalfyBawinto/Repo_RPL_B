import express from "express";
import db from "./config/Database.js";
import router from "./routers/router.js";

const app = express();

    try {
        await db.authenticate();
        console.log('Database connection successful');
    } catch (error) {
        console.error(error);
    }



    // Menjalankan server
    app.listen(3001, () => console.log('Server is running on port 3001'));

