function startTimer() {
    let tiempoInput = document.getElementById('tiempo');
    let tiempoTotal = parseInt(tiempoInput.value); 

    if (tiempoTotal <= 0 || isNaN(tiempoTotal)) {
        alert('Por favor, ingresa un tiempo válido mayor a 0 segundos.');
        return;
    }

    
    tiempoInput.disabled = true;
    document.querySelector('button').disabled = true;

    let tiempoRestante = tiempoTotal;
    let countdownInterval = setInterval(function() {
        tiempoRestante--;

        if (tiempoRestante <= 0) {
            clearInterval(countdownInterval);
            tiempoInput.disabled = false;
            document.querySelector('button').disabled = false;
            alert('¡Se ha acabado el tiempo!');
            playAlarm(); 
        }
    }, 1000); 
    function playAlarm() {
        var audio = document.getElementById('alarmAudio');
        audio.src = "audio/alarma.mpeg" ; 
        audio.play();
    
    }
    function reloje(){
        let tiempoact = new Date();
        let hora = tiempoact.getHours();
        let minutos = tiempoact.getminutes();
        let segundos = String(tiempoact.getSeconds()).padStart.value;
        let textohora = hora + ":" + minutos + " :" + segundos;
        elementotextoalarma.textcontent = textohora;
    
    }
}

