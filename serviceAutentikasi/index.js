//Inisialisai library dan module
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routeAutentikasi = require('./routes/routeAutentikasi');
const routeKelolapengguna = require('./routes/routerKelolapengguna');
const formidable = require('express-formidable');

//Implementasi Formidable
app.use(formidable());

//Inisialisasi 
const dotenv = require('dotenv');
const router = require('./routes/routeAutentikasi');
dotenv.config();

//Inisialisasi Basis Data
mongoose.connect(
    process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Koneksi Basis Data Berhasil');
    }
);

//Inisialisasi Router
const base_url = '/api/';
app.get(base_url, (req, res) => {
    return res.send({
        'berhasil' : true,
        'pesan' : 'Endpoint Utama Service Autentikasi'
    });
});

app.use(base_url + 'autentikasi/', routeAutentikasi);
app.use(base_url + 'pengguna/', routeKelolapengguna);

//Menjalankan Server
const port = 3001;
app.listen(port, () => {
    console.log(`Server Autentikasi Dijalankan pada Port ${port}`);
});