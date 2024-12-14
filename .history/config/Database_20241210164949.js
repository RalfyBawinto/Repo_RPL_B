import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rpl_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307 // Sesuaikan dengan port XAMPP Anda
});

export { sequelize };  // Menggunakan ekspor bernama
