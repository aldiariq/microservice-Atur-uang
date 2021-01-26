//Import Library dan Module
const { Router } = require("express")
const router = require('express').Router();
const {validasiCatat, validasiPencatatan} = require('../validasi/validasiInputan');
const modelCatatan = require('../model/modelCatatan');

//Inisialisasi route
router.get("/lihatcatatan/:_id", async (req, res) => {
    //Tampung ID Pengguna
    const idpengguna = req.params._id;

    //Tampung Data Catatan
    const datacatatan = await modelCatatan.find({
        idpengguna: idpengguna
    });

    //Pengecekan Data Catatan
    if (datacatatan) {
        return res.send({
            'berhasil': true,
            'pesan': "Berhasil Mendapatkan Data Catatan",
            'catatan': datacatatan
        });
    } else {
        return res.send({
            'berhasil': false,
            'pesan': "Gagal Mendapatkan Data Catatan",
            'catatan': datacatatan
        });
    }
});

router.post("/simpancatatan/", async (req, res) => {
    //Tampung Error Inputan
    const {error} = validasiPencatatan(req.fields);

    //Cek Error Inputan
    if (error) {
        return res.send({
            'berhasil': false,
            'pesan': "Pastikan Inputan Memenuhi Syarat"
        });
    } else {
        //Tampung Data Catatan
        const datacatatan = new modelCatatan({
            idpengguna: req.fields.idpengguna,
            jumlahcatatan: req.fields.jumlahcatatan,
            jumlahtabunganterakhir: req.fields.jumlahtabunganterakhir,
            jeniscatatan: req.fields.jeniscatatan
        });

        //Proses Penyimpanan Catatan
        const simpancatatan = await datacatatan.save();

        //Pengecekan Status Penyimpanan
        if (simpancatatan) {
            return res.send({
                'berhasil': true,
                'pesan': "Catatan Berhasil Disimpan"
            });
        } else {
            return res.send({
                'berhasil': false,
                'pesan': "Catatn Gagal Disimpan"
            });
        }
    }
});

//Export Module
module.exports = router;