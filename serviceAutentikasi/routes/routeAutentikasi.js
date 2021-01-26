//Import Library dan Module
const { Router } = require("express")
const router = require('express').Router();
const {validasiDaftar, validasiMasuk} = require('../validasi/validasiInputan');
const modelPengguna = require('../model/modelPengguna');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const validasiToken = require('../validasi/validasiToken');

//Implementasi Router
router.post('/daftar', async (req, res) => {
    //Tampung Error Inputan
    const {error} = validasiDaftar(req.fields);

    //Pengecekan Error
    if (error) {
        return res.send({
            'berhasil': false,
            'pesan': 'Pastikan Inputan Memenuhi Syarat'
        });
    } else {
        //Tampung Cek Email Pengguna
        const cekEmail = await modelPengguna.findOne({
            email: req.fields.email
        });

        //Pengecekan Data Pengguna Berdasarkan Email
        if (cekEmail) {
            return res.send({
                'berhasil': false,
                'pesan': 'Pastikan Email Belum Terdaftar'
            });
        } else {
            //Proses Pendaftaran Pengguna
            const salt = await bcryptjs.genSalt(10);
            const passwordEnkripsi = await bcryptjs.hash(req.fields.password, salt);

            const dataPengguna = new modelPengguna({
                'email': req.fields.email,
                'nama': req.fields.nama,
                'password': passwordEnkripsi
            });

            const daftarPengguna = await dataPengguna.save();

            //Pengecekan Status Pendaftaran
            if (daftarPengguna) {
                return res.send({
                    'berhasil': true,
                    'pesan': 'Berhasil Mendaftarkan Pengguna'
                });
            } else {
                return res.send({
                    'berhasil': false,
                    'pesan': 'Gagal Mendaftarkan Pengguna'
                });
            }
        }
    }
});

router.post('/masuk', async (req, res) => {
    //Tampung Error Inputan
    const {error} = validasiMasuk(req.fields);

    //Pengecekan Error
    if (error) {
        return res.send({
            'berhasil': false,
            'pesan': 'Pastikan Inputan Memenuhi Syarat'
        });
    } else {
        //Tampung Cek Email Pengguna
        const cekEmail = await modelPengguna.findOne({
            'email': req.fields.email
        });

        //Pengecekan Data Pengguna Berdasarkan Email
        if (cekEmail) {
            //Proses Pengecekan Password Pengguna
            const cekPengguna = await bcryptjs.compare(req.fields.password, cekEmail.password);

            if (cekPengguna) {
                //Proses Pembuatan Token Menggunakan JWT
                const tokenPengguna = jsonwebtoken.sign({
                    _id: cekPengguna._id,
                    email: cekPengguna.email
                }, process.env.JSONWEBTOKEN);

                //Tampung Data Pengguna
                const dataPengguna = ({
                    _id: cekEmail._id,
                    email: cekEmail.email,
                    nama: cekEmail.nama,
                    tanggaldaftar: cekEmail.tanggaldaftar
                });

                return res.send({
                    'berhasil': true,
                    'token': tokenPengguna,
                    'pengguna': dataPengguna
                });

            } else {
                return res.send({
                    'berhasil': false,
                    'pesan': "Pastikan Password Benar"
                });
            }
        } else {
            return res.send({
                'berhasil': false,
                'pesan': "Pastikan Email Terdaftar"
            });
        }
    }
});

router.get('/autentikasi', validasiToken, async (req, res) => {
    //Tampung Data Pengguna Dari Proses Validasi Token
    const datapengguna = req.pengguna;

    if (datapengguna) {
        return res.send({
            'berhasil': true,
            'pesan': "Pengguna Terautentikasi"
        });
    }else {
        return res.send({
            'berhasil': false,
            'pesan': "Pengguna Tidak Terautentikasi"
        });
    }
});

//Export Module
module.exports = router;