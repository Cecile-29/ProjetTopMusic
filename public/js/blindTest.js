document.addEventListener('DOMContentLoaded', () => {
    // Ecoute de la réponse
    document.addEventListener('reponseBlindTest', (e) => {
        let artistTrue = verifArtist(e.detail.transcript);
        let songTrue = verifTitle(e.detail.transcript);
        if(artistTrue && songTrue) {
            alert("bravo vous avez trouvé");
        }
        else if(artistTrue) {
            alert("Vous avez trouvé l'artiste, quel est la chanson maintenant ?");
        }
        else if(songTrue) {
            alert("Vous avez trouvé la chanson, quel est l'artiste maintenant ?");
        }
    });
})

function verifArtist(response) {
    return response.toLowerCase().includes(document.getElementById('artist_song').value.toLowerCase()); 
}

function verifTitle(response) {
   return response.toLowerCase().includes(document.getElementById('title_song').value.toLowerCase()); 
}