import express from 'express';
import cors from 'cors';
import db from './config/Database.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint untuk register dan login
app.use('/api', authRoutes);

// Sync database
db.sync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection failed: ' + err));

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
