import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rpl_b_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

export default sequelize;
