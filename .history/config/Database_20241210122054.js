import { Sequelize } from "sequelize";

const sequelize = new Sequelize('management_lab_rpl_b', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307 // Sesuaikan dengan port XAMPP Anda
});

export { sequelize };  // Menggunakan ekspor bernama
