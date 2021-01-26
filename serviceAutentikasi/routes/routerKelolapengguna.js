//Import Library dan Module
const router = require('express').Router();
const {validasiGantipassword} = require('../validasi/validasiInputan');
const validasiToken = require('../validasi/validasiToken');
const modelPengguna = require('../model/modelPengguna');
const bcryptjs = require('bcryptjs');

//Inisialisasi route
router.patch('/gantipassword', validasiToken, async (req, res)=>{
    //Tampung error inputan
    const {error} = validasiGantipassword(req.fields);

    //Pengecekan Error
    if (error) {
        return res.send({
            'berhasil': false,
            'pesan': 'Pastikan Inputan Memenuhi Syarat'
        });
    } else {
        //Tampung Hasil Pencarian Pengguna
        const dataPengguna = await modelPengguna.findOne({
            email: req.fields.email
        });

        //Pengecekan Data Pengguna
        if (dataPengguna) {
            //Proses Enkripsi dan Pengubahan Password
            const salt = await bcryptjs.genSalt(10);
            const passwordEnkripsi = await bcryptjs.hash(req.fields.password, salt);

            const gantiPassword = await modelPengguna.updateOne(
                {
                    email: req.fields.email
                },
                {
                    password: passwordEnkripsi
                }
            );

            //Pengecekan Status Ganti Password
            if (gantiPassword) {
                return res.send({
                    'berhasil': true,
                    'pesan': 'Berhasil Mengganti Password'
                });
            } else {
                return res.send({
                    'berhasil': false,
                    'pesan': 'Gagal Mengganti Password'
                });
            }
        } else {
            return res.send({
                'berhasil': false,
                'pesan': 'Data Pengguna Tidak Ditemukan'
            });
        }
    }
});

//Export Module
module.exports = router;