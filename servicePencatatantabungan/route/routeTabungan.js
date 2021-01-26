//Import Library dan Module
const router = require('express').Router();
const modelTabungan = require('../model/modelTabungan');
const { validasiTabungan } = require('../validasi/validasiInputan');

//Implementasi Router
router.get('/lihattabungan/:_id', async (req, res) => {
    //Tampung ID Pengguna Dari Parameter URL
    const idpengguna = req.params._id;

    //Pengecekan ID Pengguna
    if (idpengguna) {
        //Tampung Data Tabungan Berdasarkan ID Pengguna Tersebut
        const cektabungan = await modelTabungan.findOne({
            idpengguna: idpengguna
        });

        //Pengecekan Data Tabungan
        if (cektabungan) {
            return res.send({
                'berhasil': true,
                'pesan': "Berhasil Mendapatkan Data Tabungan",
                'tabungan': cektabungan
            });
        } else {
            return res.send({
                'berhasil': false,
                'pesan': "Gagal Mendapatkan Data Tabungan",
                'tabungan': null
            });
        }
    } else {
        return res.send({
            'berhasil': false,
            'pesan': "ID Pengguna Tidak Ditemukan"
        });
    }
});

router.post('/tambahtabungan/', async (req, res) => {
    //Tampung Error Inputan
    const { error } = validasiTabungan(req.fields);

    //Pengecekan Error Inputan
    if (error) {
        return res.send({
            'berhasil': false,
            'pesan': "Pastikan Inputan Sesuai"
        });
    } else {
        //Tampung Data Cek Email
        const cekemail = await modelTabungan.findOne({
            idpengguna: req.fields.idpengguna
        });

        if (cekemail) {
            return res.send({
                'berhasil': false,
                'pesan': "Data Tabungan Pengguna Sudah Ada"
            });
        } else {
            //Tampung Data Tabungan
            const datatabungan = new modelTabungan({
                idpengguna: req.fields.idpengguna,
                jumlahtabungan: req.fields.jumlahtabungan
            });

            //Proses Penyimpanan Data Tabungan
            const simpantabungan = await datatabungan.save();

            //Pengecekan Status Penyimpanan Data Tabungan
            if (simpantabungan) {
                return res.send({
                    'berhasil': true,
                    'pesan': "Berhasil Menyimpan Data"
                });
            } else {
                return res.send({
                    'berhasil': false,
                    'pesan': "Gagal Menyimpan Data"
                });
            }
        }
    }
});

router.post('/ubahtabungan/:_id', async (req, res) => {
    //Tampung Error Inputan
    const { error } = validasiTabungan(req.fields);

    //Pengecekan Error Inputan
    if (error) {
        return res.send({
            'berhasil': false,
            'pesan': "Pastikan Inputan Sesuai11"
        });
    } else {
        //Tampung Cek Pengguna Berdasarkan ID Pengguna
        const idpengguna = req.params._id;

        const cekemail = await modelTabungan.findOne({
            idpengguna: idpengguna
        });

        //Pengecekan Data Tabungan
        if (cekemail) {
            //Tampung Data Ubah Tabungan
            const ubahtabungan = await modelTabungan.updateOne(
                {
                    idpengguna: idpengguna
                },
                {
                    jumlahtabungan: req.fields.jumlahtabungan
                }
            );

            //Pengecekan Status Ubah Data Tabungan
            if (ubahtabungan) {
                return res.send({
                    'berhasil': true,
                    'pesan': "Berhasil Mengubah Data Tabungan"
                });
            } else {
                return res.send({
                    'berhasil': false,
                    'pesan': "Gagal Mengubah Data Tabungan"
                });
            }
        } else {
            return res.send({
                'berhasil': false,
                'pesan': "ID Pengguna Tidak Ditemukan"
            });
        }
    }
});

//Export Module
module.exports = router;