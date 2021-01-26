//Import Library dan Module
const Joi = require('@hapi/joi');

//Implementasi Validasi Inputan
const validasiPencatatan = (data) => {
    const schemaPencatatan = Joi.object({
        idpengguna: Joi.string().required(),
        jumlahcatatan: Joi.number().required(),
        jumlahtabunganterakhir: Joi.number().required(),
        jeniscatatan: Joi.string().required(),
    });

    return schemaPencatatan.validate(data);
};

//Export Module
module.exports.validasiPencatatan = validasiPencatatan;