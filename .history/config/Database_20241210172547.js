import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rpl_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));

export default sequelize;
