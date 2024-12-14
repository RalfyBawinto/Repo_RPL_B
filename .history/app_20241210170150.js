const sequelize = require('./config/Database');
const User = require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');


sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Database sync error:', err));

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
