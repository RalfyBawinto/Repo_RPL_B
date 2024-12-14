import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/Database.js';
import authRouter from './routes/auth.js';  // Import route login dan signup

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Untuk parsing request body dalam format JSON

// Menggunakan route login dan signup
app.use(authRouter);

const PORT = 3001;
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection failed:', err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
