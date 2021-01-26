//Import Library dan Module
const Joi = require('@hapi/joi');

//Implementasi validasi inputan
const validasiDaftar = (data) => {
    const schemaDaftar = Joi.object({
        email: Joi.string().required().email(),
        nama: Joi.string().required(),
        password: Joi.string().required()
    });

    return schemaDaftar.validate(data);
}

const validasiMasuk = (data) => {
    const schemaMasuk = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schemaMasuk.validate(data);
}

const validasiGantipassword = (data) => {
    const schemaGantipassword = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

    return schemaGantipassword.validate(data);
}

//Export Module
module.exports.validasiDaftar = validasiDaftar;
module.exports.validasiMasuk = validasiMasuk;
module.exports.validasiGantipassword = validasiGantipassword;