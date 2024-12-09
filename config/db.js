const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database
const sequelize = new Sequelize('mysql://user:rpl_pass@localhost:3306/db_rpl_b', {
  logging: false,  // Nonaktifkan logging jika tidak diperlukan
});

// Cek koneksi
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
