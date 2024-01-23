const apiDeezer = require("../services/deezer.js");
const apiTopMusic = require("../services/topMusic.js")

exports.get = (req, res) => {
    const api = new apiDeezer();
    const topMusic = new apiTopMusic();
    if(req.query.keyword != undefined && req.query.keyword.trim() != '') {
        api.search(req.query.keyword).then(async (result) => {
            let musics = [];
            let promises = [];   
            for(element of result.data) {
                promises[promises.length] = await topMusic.getCover(element.album).then(cover => {
                    musics.push({
                        title: element.title,
                        preview: element.preview,
                        artist_name: element.artist.name,
                        artist_picture_medium: element.artist.name,
                        cover
                    });
                })
            }
            Promise.all(promises).then(() => {
                res.render('search', {keyword: req.query.keyword, musics});           
            })
        }).catch((result) => {
            console.log(result)
        });  
    } else {
        res.render('search')
    }
} 