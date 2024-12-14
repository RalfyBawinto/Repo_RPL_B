import { Sequelize } from "sequelize";

const db = new Sequelize('management_lab_rpl_b', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307 // Tambahkan port sesuai dengan konfigurasi XAMPP
});

export default db;
