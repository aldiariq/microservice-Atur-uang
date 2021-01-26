//Import Library dan Module
const express = require('express');
const app = express();
const routeAutentikasi = require('./route/routeAutentikasi');
const routeTabungan = require('./route/routeTabungan');
const formidable = require('express-formidable');

app.use(formidable());

//Inisialisasi Router
const base_url = "/api/"
app.get(base_url, (req, res) => {
    return res.send({
        'berhasil': true,
        'pesan': "Router Utama API Gateway"
    });
});

app.use(base_url + "autentikasi/", routeAutentikasi);
app.use(base_url + "tabungan/", routeTabungan);


//Menjalankan Server
const port = 3000;
app.listen(port, () => {
    console.log(`Berhasil Menjalankan Server pada Port ${port}`);
});
