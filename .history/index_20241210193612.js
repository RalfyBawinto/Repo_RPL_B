import express from 'express';
import db from "./config/Database.js";
const app = express();


try {
    await db.authenticate();
    console.log('Database connection successful');
    await db.sync();
} catch (error) {
    console.error(error);
}

app.listen(3001, () => console.log('Server is running on port 3001'));