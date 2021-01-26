//Import Library dan Module
const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { restart } = require('nodemon');
const validasiToken = require('../validasi/validasiToken');

//Inisialisasi URL Endpoint Microservice
const urltabungan = process.env.ENDPOINTTABUNGAN;
const urlpencatatantabungan = process.env.ENDPOINTCATATANTABUNGAN;

//Implementasi Router
router.get('/lihattabungan/:_id', validasiToken, async (req, res) => {
    //Tampung ID Pengguna
    const idpengguna = req.params._id;

    await axios.get(
        urltabungan + "/kelolatabungan/lihattabungan/" + idpengguna,
    ).then(async (resp) => {
        return res.send(resp.data);
    });
});

router.post('/ubahtabungan', validasiToken, async (req, res) => {
    //Tampung ID Pengguna
    const idpengguna = req.fields.idpengguna;

    await axios.get(
        urltabungan + "/kelolatabungan/lihattabungan/" + idpengguna,
    ).then(async (resp) => {
        if (resp.data.berhasil) {
            //Inisialisasi Parameter Microservice Tabungan
            const jumlahtabungan = parseInt(req.fields.jumlahtabungan);

            //Inisialisasi Parameter Microservice Pencatatan Tabungan
            const jumlahcatatan = parseInt(req.fields.jumlahtabungan);
            const jumlahtabunganterakhir = parseInt(resp.data.tabungan.jumlahtabungan);
            const jeniscatatan = req.fields.jeniscatatan;

            if (jeniscatatan == "MASUK") {
                await axios.post(
                    urltabungan + "/kelolatabungan/ubahtabungan/" + idpengguna,
                    {
                        jumlahtabungan: jumlahtabunganterakhir + jumlahtabungan
                    }
                ).then(
                    async (resp2) => {
                        if (resp2.data.berhasil) {
                            await axios.post(
                                urlpencatatantabungan + "/catatan/simpancatatan",
                                {
                                    idpengguna: idpengguna,
                                    jumlahcatatan: jumlahcatatan,
                                    jumlahtabunganterakhir: jumlahtabunganterakhir,
                                    jeniscatatan: jeniscatatan
                                }
                            ).then(async (resp3) => {
                                return res.send(resp3.data);
                            });
                        } else {
                            return res.send(resp2.data);
                        }
                    }
                );
            } else if (jeniscatatan == "KELUAR") {
                if (jumlahtabunganterakhir >= jumlahcatatan) {
                    await axios.post(
                        urltabungan + "/kelolatabungan/ubahtabungan/" + idpengguna,
                        {
                            jumlahtabungan: jumlahtabunganterakhir - jumlahcatatan
                        }
                    ).then(
                        async (resp) => {
                            if (resp.data.berhasil) {
                                await axios.post(
                                    urlpencatatantabungan + "/catatan/simpancatatan",
                                    {
                                        idpengguna: idpengguna,
                                        jumlahcatatan: jumlahcatatan,
                                        jumlahtabunganterakhir: jumlahtabunganterakhir - jumlahcatatan,
                                        jeniscatatan: jeniscatatan
                                    }
                                ).then(async (resp2) => {
                                    return res.send(resp2.data);
                                });
                            } else {
                                return res.send(resp.data);
                            }
                        }
                    );
                } else {
                    return res.send({
                        berhasil: false,
                        pesan: "Jumlah Tabungan Terakhir Tidak Cukup"
                    })
                }
            }
        } else {
            return res.send(resp.data);
        }
    });
});

router.get('/lihatcatatantabungan/:_id', validasiToken, async (req, res) => {
    //Tampung ID Pengguna
    const idpengguna = req.params._id;

    await axios.get(
        urlpencatatantabungan + "/catatan/lihatcatatan/" + idpengguna
    ).then(
        async (resp) => {
            return res.send(resp.data);
        }
    );
});

//Export Module
module.exports = router;