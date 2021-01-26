//Import Library dan Module
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const formidable = require('express-formidable');
const routeTabungan = require('./route/routeTabungan');

app.use(formidable());

//Implementasi Routing
const base_url = "/api/";
app.get(base_url, (req, res) => {
    return res.status(200).send({
        'berhasil': true,
        'pesan': "Endpoint Utama Service Pencatatan Tabungan"
    });
});

app.use(base_url + 'kelolatabungan', routeTabungan);

//Koneksi Basis Data
mongoose.connect(
    process.env.MONGODB,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log("Koneksi Basis Data Berhasil");
    }
);

//Menjalankan server
const port = 3002;
app.listen(port, () => {
    console.log(`Berhasil Menjalankan Server pada Port ${port}`);
});