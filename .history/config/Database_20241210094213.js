import { Sequelize } from "sequelize";

const db = new Sequelize('management_lab_rpl_b', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;