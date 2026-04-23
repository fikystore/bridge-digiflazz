const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Jembatan pintar: Bisa nerima alamat apa saja (/v1/cek-saldo, /v1/transaction, dll)
app.post('/*', async (req, res) => {
    try {
        // req.path akan membaca tujuan akhir, lalu ditempel ke alamat asli Digiflazz
        const targetUrl = 'https://api.digiflazz.com' + req.path;
        const response = await axios.post(targetUrl, req.body);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Jembatan Pintar jalan di port ${PORT}`));
