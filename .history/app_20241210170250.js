import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Database sync error:', err));

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
