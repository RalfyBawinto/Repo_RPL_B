const sequelize = require('./config/db');
const User = require('./models/User');

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Database sync error:', err));
