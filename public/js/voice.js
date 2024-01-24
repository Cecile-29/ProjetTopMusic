const result = document.getElementById('result');

// Vérifier si la reconnaissance vocale est disponible dans le navigateur
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    let recognizing = false;
    recognition.continuous = true; 
    recognition.lang = 'fr-FR'; /* @todo : A changer en fonction de la musique */


    // Événement lors de la détection de la voix
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        result.textContent = `Vous avez dit : ${transcript}`;
        let reponseEvent = new CustomEvent("reponseBlindTest", {detail:{transcript}});
        document.dispatchEvent(reponseEvent);
    };

    // Événement en cas d'erreur
    recognition.onerror = (event) => {
       console.log('Erreur de reconnaissance vocale : ' + event.error);
    };

    // Détecter l'appui sur la barre d'espace
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            event.stopPropagation();
            if (!recognizing) {                
                recognition.start();
                recognizing = true;
            }
        }
    });

    // Détecter le relachement de la barre d'espace
    window.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            event.stopPropagation();            
            if (recognizing) {
                setTimeout(() => {
                    recognition.stop();
                    recognizing = false;
                }, 300);
            }
        }
    });
}