//Import Library dan Module
const Joi = require('@hapi/joi');

//Implementasi Validasi Inputan
const validasiTabungan = (data) => {
    const schemaTabungan = Joi.object({
        jumlahtabungan: Joi.number().required(),
    });

    return schemaTabungan.validate(data);
}

//Export Module
module.exports.validasiTabungan = validasiTabungan;