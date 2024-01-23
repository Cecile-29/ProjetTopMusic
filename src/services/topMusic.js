const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = class {

    async getCover(album) {        
        let pathDest = path.join(__dirname, '..', '..', 'public', 'covers', album.id+".jpg")
        if(!fs.existsSync(pathDest)) {
            await this.download(album.cover, pathDest);
        } 
        return `/covers/${album.id}.jpg`;
    }

    async download(url, path) {
        try {
            const response = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream',
            });
            return response.data.pipe(fs.createWriteStream(path));
        } catch (error) {
            throw new Error('Erreur lors du téléchargement de l\'image : ', error);
        }
    }
}