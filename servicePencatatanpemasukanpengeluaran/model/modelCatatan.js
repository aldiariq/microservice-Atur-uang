//Import Library dan Module
const mongoose = require('mongoose');

//Inisialisasi Model Pengguna
const modelCatatan = mongoose.Schema({
    idpengguna: {
        type: String,
        required: true,
    },
    jumlahcatatan: {
        type: Number,
        required: true,
    },
    jumlahtabunganterakhir: {
        type: Number,
        required: true
    },
    jeniscatatan: {
        type: String,
        enum: ['MASUK', 'KELUAR'],
        required: true
    },
    tanggalcatatan: {
        type: Date,
        default: Date.now
    }
});

//Export Module
module.exports = mongoose.model('modelCatatan', modelCatatan);