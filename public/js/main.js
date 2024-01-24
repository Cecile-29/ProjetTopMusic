document.addEventListener('DOMContentLoaded', () => {
    // Pour ne pas avoir l'écoute si l'utilisateur tape un espace dans la recherche
    document.querySelector("#keyword").addEventListener('keydown', (e) => e.stopPropagation())
    document.querySelector("#keyword").addEventListener('keyup', (e) => e.stopPropagation())

    document.querySelectorAll('[data-music]').forEach((element) => {
        element.addEventListener('click', (event) => {        
            const current = event.currentTarget
            // info
            document.getElementById('title_song').value=current.dataset.title;
            document.getElementById('artist_song').value=current.dataset.artist;

            document.querySelector('.amazingaudioplayer-title').textContent=current.dataset.title;
            document.querySelector('.amazingaudioplayer-info').textContent=current.dataset.artist;
            document.querySelector('#cover').src=current.dataset.cover;
            document.querySelector('#listenTopMusic').classList.remove('hide')

            // Le son 
            const audioElement = document.getElementById('listenTopMusic');
            audioElement.src = current.dataset.music;
            audioElement.play();
        })
    });
})