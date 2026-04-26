const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// 👇 INI DIA PINTU KHUSUS BUAT CRON-JOB BOS 👇
app.get('/', (req, res) => {
    res.status(200).send('SERVER DIGIFLAZZ SIAP BOSSS!');
});
// 👆 ========================================== 👆

app.post('/*', async (req, res) => {
    try {
        const targetUrl = 'https://api.digiflazz.com' + req.path;
        
        // Kita tambahkan "User-Agent" agar Cloudflare Digiflazz tidak memblokir
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.36.1' 
            }
        };
        
        const response = await axios.post(targetUrl, req.body, config);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Pakai .send() karena kalau error dari Cloudflare bentuknya HTML, bukan JSON
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Jembatan Pintar jalan di port ${PORT}`));
