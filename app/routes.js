// const axios = require('axios');
// const homeController = require('../src/controllers/HomeController.js');
// const registerController = require('../src/controllers/RegisterController.js');


// module.exports = (app) => {
//     app.get('/', homeController.get)
//     app.get('/inscription', registerController.get)
//     app.post('/inscription', registerController.post) 

//     app.post('/search', async (req, res) => {
//         const artistName = req.body.artist;
//         try {
//             const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistName}`, {
//                 headers: {
//                     'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
//                     'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
//                 }
//             });

//             const artistData = response.data;
//             res.render('search', { artistData });
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             res.render('error', { error });
//         }
//     });
// };

const home = require('../src/controllers/HomeController.js');
const search = require('../src/controllers/SearchController.js');
const register = require('../src/controllers/RegisterController.js');
const auth = require('../src/controllers/AuthenticationController.js');


module.exports = (app) => {
    app.get('/', home.get)
    app.get('/search',  search.get)

    app.get('/inscription', register.get)
    app.post('/inscription', register.post)

    
    app.get('/connexion', auth.get)
    app.post('/connexion', auth.post)
}