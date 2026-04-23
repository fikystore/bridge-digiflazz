const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Endpoint untuk menerima tembakan dari Cloudflare Workers kamu
app.post('/gas', async (req, res) => {
    try {
        // Meneruskan request ke Digiflazz
        const response = await axios.post('https://api.digiflazz.com/v1/transaction', req.body);
        res.json(response.data);
    } catch (error) {
        // Jika gagal, tampilkan pesan error dari Digiflazz (termasuk informasi IP yang terdeteksi)
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Bridge Digiflazz jalan di port ${PORT}`));
