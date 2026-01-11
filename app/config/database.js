// TODO: Buat koneksi pool MySQL disini menggunakan Environment Variable (process.env)
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'db', // 'db' adalah nama service di docker-compose
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'rootpassword',
    database: process.env.DB_NAME || 'hustlink_db',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error('ERROR: Gagal konek ke database:', err);
        return;
    }
    console.log('SUKSES: Terhubung ke Database MySQL');
});

module.exports = connection;