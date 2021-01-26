//Import Library dan Module
const mongoose = require('mongoose');

//Inisialisasi Model Tabungan
const modelTabungan = mongoose.Schema({
    idpengguna: {
        type: String,
        required: true
    },
    jumlahtabungan: {
        type: Number,
        required: true,
    },
    tanggaltabungan: {
        type: Date,
        default: Date.now
    }
});

//Export Module
module.exports = mongoose.model('modelTabungan', modelTabungan);