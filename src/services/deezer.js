const axios = require('axios');
module.exports = class {

    async search(keyword) {
        const options = {
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
            params: {q: keyword},
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        try {           
            const response = await axios.request(options);
            return response.data;            
        } catch (error) {
            console.error(error);
        }
    }

}