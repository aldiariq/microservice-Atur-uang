//Import Library dan Module
const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { restart } = require('nodemon');

//Implementasi Router
//Konfigurasi Route Autentikasi
const urlautentikasi = process.env.ENDPOINTAUTENTIKASI;
const urltabungan = process.env.ENDPOINTTABUNGAN;

router.post(
    '/daftar',
    async (req, res) => {
        await axios.post(urlautentikasi + "/autentikasi/daftar",
            req.fields
        ).then(
            (resp) => {
                return res.send(
                    resp.data
                );
            }
        );
    }
)

router.post(
    '/masuk',
    async (req, res) => {
        await axios.post(urlautentikasi + "/autentikasi/masuk",
            req.fields,
        ).then(
            async (resp) => {
                const idpengguna = resp.data.pengguna['_id'];
                console.log("idpengguna" + idpengguna);

                await axios.get(
                    urltabungan + "/kelolatabungan/lihattabungan/" + idpengguna,
                ).then(async (resp2) => {
                    if (resp2.data.berhasil) {
                        return res.send(resp.data);
                    } else {
                        console.log(urltabungan + "/kelolatabungan/tambahtabungan");
                        await axios.post(
                            urltabungan + "/kelolatabungan/tambahtabungan",
                            {
                                idpengguna: idpengguna,
                                jumlahtabungan: 0
                            }
                        ).then(async (resp3) => {
                            console.log(resp3.data);
                            if (resp3.data.berhasil) {
                                return res.send(resp.data);
                            } else {
                                return res.send({
                                    berhasil: false,
                                    pesan: "Jumlah Tabungan Awal Gagal Ditambahkan"
                                });
                            }
                        });
                    }
                });

                return res.send(
                    resp.data
                );
            }
        );
    }
);

//Export Module
module.exports = router;