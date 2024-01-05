const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
    const artistName = req.body.artist;
    const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistName}`, {
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    });

    const artistData = response.data;
    res.render('search', { artistData });

});

app.listen(3000);
