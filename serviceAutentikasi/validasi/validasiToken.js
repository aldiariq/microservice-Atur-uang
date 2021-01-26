//Import library dan module
const jsonwebtoken = require('jsonwebtoken');

//Proses pengecekan token
module.exports = function (req, res, next) {
    //Tampung Token dari Header
    const tokenPengguna = req.header('authtoken');

    //Proses Pengecekan Token
    try {
        if (tokenPengguna) {
            //Pengecekan Token Penggunakan JWT
            const verifikasiToken = jsonwebtoken.verify(tokenPengguna, process.env.JSONWEBTOKEN);

            if (verifikasiToken) {
                req.pengguna = verifikasiToken;
                next();
            } else {
                return res.send({
                    'berhasil': false,
                    'pesan': 'Token Tidak Valid'
                });
            }
        } else {
            return res.send({
                'berhasil': false,
                'pesan': 'Token Tidak Ditemukan'
            });
        }
    } catch (error) {
        return res.send({
            'berhasil': false,
            'pesan': 'Token Tidak Valid'
        });
    }
}