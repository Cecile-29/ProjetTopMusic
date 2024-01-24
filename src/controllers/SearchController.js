// importe les services :
const apiDeezer = require("../services/deezer.js");
const apiTopMusic = require("../services/topMusic.js");
const musicRepo = require('../repositories/musics.js');

// Exporte une fonction qui sera utilisée comme callback pour la route GET => /search. La fonction prend en paramètre une requête de type GET 
exports.get = (req, res) => {
// req.query est un objet qui contient les paramètres de la requête
// (voir https://expressjs.com/en/4x/api.html#req.query)
//(req, res) parametres de la requête 
    console.log('test'); // Affiche "test" dans la console

    // Instancie les services Deezer et TopMusic
    const api = new apiDeezer();
    const topMusic = new apiTopMusic();

    // Vérifie si le paramètre 'keyword' est présent dans la requête et s'il n'est pas vide
    // trim() supprime les espaces en trop
    if (req.query.keyword != undefined && req.query.keyword.trim() != '') {
        // Utilise le service Deezer pour rechercher des informations sur l'artiste
        // api.search() renvoie un tableau d'objets 
        // then(async (result)   
        api.search(req.query.keyword).then(async (result) => {
            let musics = []; // Initialise un tableau vide pour stocker les informations sur les chansons
            let promises = []; // Initialise un tableau vide pour stocker les promesses

            // Parcourt les résultats de la recherche Deezer
            for (element of result.data) {
                // Utilise le service TopMusic pour obtenir la couverture de l'album
                promises[promises.length] = await topMusic.getCover(element.album).then(async cover => {
                    // Ajoute les informations sur la chanson au tableau 'musics'
                    musics.push({
                        id_rapid_api_deezer: element.id,
                        title: element.title,
                        preview: element.preview,
                        artist_name: element.artist.name,
                        artist_picture_medium: element.artist.name,
                        cover,
                        exists: (await musicRepo.findOne({ id_rapid_api_deezer: element.id }) ? true : false)
                    });
                })
            }

            // Attend que toutes les promesses soient résolues
            Promise.all(promises).then(() => {
              //  console.log(musics); // Affiche le tableau 'musics' dans la console
                // Rend la vue 'search' avec les données de la recherche
                res.render('search', { keyword: req.query.keyword, musics });
            })
        }).catch((result) => {
            console.log(result); // Affiche les erreurs dans la console
        });
    } else {
        // Rend la vue 'search' sans données si le paramètre 'keyword' est absent ou vide
        res.render('search');
    }
}

exports.post = (req, res) => {
    const music = new musicRepo();
    music.id_rapid_api_deezer = req.body.id_rapid_api_deezer;
    music.title = req.body.title;
    music.artist_name = req.body.artist_name;
    music.cover = req.body.cover;
    music.preview = req.body.preview;
    music.save();
    
    req.flash('notify', `La musique a bien été enregistrée !`)
    res.redirect('/search?keyword='+req.query.keyword);
} 


// const apiDeezer = require("../services/deezer.js");
// const apiTopMusic = require("../services/topMusic.js");
// const musicRepo = require('../repositories/musics.js');

// exports.get = (req, res) => {
//     const api = new apiDeezer();
//     const topMusic = new apiTopMusic();
//     if(req.query.keyword != undefined && req.query.keyword.trim() != '') {
//         api.search(req.query.keyword).then(async (result) => {
//             let musics = [];
//             let promises = [];   
//             for(element of result.data) {                
//                 promises[promises.length] = await topMusic.getCover(element.album).then(async cover => {
//                     musics.push({
//                         id_rapid_api_deezer: element.id,
//                         title: element.title,
//                         preview: element.preview,
//                         artist_name: element.artist.name,
//                         artist_picture_medium: element.artist.name,
//                         cover,
//                         exists: (await musicRepo.findOne({ id_rapid_api_deezer: element.id }) ? true : false)
//                     });
//                 })
//             }
            
//             Promise.all(promises).then(() => {
//                 res.render('search', {keyword: req.query.keyword, musics});           
//             })
//         }).catch((result) => {
//             console.log(result)
//         });  
//     } else {
//         res.render('search')
//     }
// } 

// exports.post = (req, res) => {
//     const music = new musicRepo();
//     music.id_rapid_api_deezer = req.body.id_rapid_api_deezer;
//     music.title = req.body.title;
//     music.artist_name = req.body.artist_name;
//     music.cover = req.body.cover;
//     music.preview = req.body.preview;
//     music.save();
    
//     req.flash('notify', `La musique a bien été enregistrée !`)
//     res.redirect('/search?keyword='+req.query.keyword);
// } 