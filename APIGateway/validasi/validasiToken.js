//Import Library dan Module
const axios = require('axios');

//Export Module
module.exports = async function (req, res, next) {
    //Inisialisasi URL Endpoint Microservice
    const urlautentikasi = process.env.ENDPOINTAUTENTIKASI;

    //Proses Pengecekan Token
    try {
        //Tampung Token dari Header
        const tokenPengguna = req.header('authtoken');

        //Pengecekan Autentikasi Pengguna
        await axios.get(
            urlautentikasi + "/autentikasi/autentikasi",
            {
                headers: {
                    'authtoken': tokenPengguna
                }
            },
        ).then((resp) => {
            if (resp.data.berhasil) {
                next();
            } else {
                return res.send(resp.data);
            }
        });
    } catch (error) {
        return res.send({
            berhasil: false,
            pesan: "Token Tidak Ditemukan"
        })
    }
}