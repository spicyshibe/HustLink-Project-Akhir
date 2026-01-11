// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Import Routes
const routes = require('./routes/index');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup View Engine
// PENTING: Mengarahkan views ke folder 'view' (sesuai struktur folder VS Code kamu)
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// Gunakan Routes
app.use('/', routes);

// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Backend HustLink berjalan di port ${PORT}`);
});