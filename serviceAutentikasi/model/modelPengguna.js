//Import library dan module
const mongoose = require('mongoose');

//Inisialisasi Model Pengguna
const modelPengguna = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    tanggaldaftar: {
        type: Date,
        default: Date.now
    }
});

//Export Module
module.exports = mongoose.model('modelPengguna', modelPengguna);