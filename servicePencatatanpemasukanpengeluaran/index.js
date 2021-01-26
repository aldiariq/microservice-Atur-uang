//Import Library dan Module
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const formidable = require('express-formidable');
const routerCatatan = require('./route/routeCatatan');

app.use(formidable());

//Koneksi Basis Data
mongoose.connect(
    process.env.MONGODB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Koneksi Basis Data Berhasil")
    }
);

//Inisialisasi Router
const base_url = "/api/";
app.get(base_url, (req, res) => {
    return res.send({
        'berhasil': true,
        'pesan': "Endpoint Utama Service Pemasukan & Pengeluaran"
    });
});

app.use(base_url + "catatan", routerCatatan);

//Menjalankan Server
const port = 3003;
app.listen(port, () => {
    console.log(`Server Berjalan pada Port ${port}`);
});