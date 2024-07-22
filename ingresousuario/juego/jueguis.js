document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { question: '¿Cuál es la capital de España?', answer: 'Madrid' },
        { question: '¿Quién escribió Don Quijote de la Mancha?', answer: 'Miguel de Cervantes' },
        { question: '¿Cuántos continentes hay en el mundo?', answer: '7' },
        { question: '¿Cuál es el animal más rápido del mundo?', answer: 'Guepardo' },
        { question: '¿En qué año llegó el hombre a la Luna?', answer: '1969' },
        { question: '¿Qué país tiene forma de bota?', answer: 'Italia' },
        { question: '¿Cuál es el río más largo del mundo?', answer: 'Amazonas' },
        { question: '¿Quién pintó La Mona Lisa?', answer: 'Leonardo da Vinci' },
        { question: '¿Cuál es el océano más grande?', answer: 'Pacífico' },
        { question: '¿Cuántos días tiene un año bisiesto?', answer: '366' }
    ];

    const timerDisplay = document.getElementById('countdown');
    const questionDisplay = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const finishButton = document.getElementById('finish');
    const retryButton = document.getElementById('retry');
    const resultDisplay = document.getElementById('result');
    const alarmAudio = document.getElementById('alarmAudio');

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let incorrectResponses = [];

    let countdown;

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionDisplay.textContent = questions[currentQuestionIndex].question;
        } else {
            finishGame();
        }
    }

    function startTimer(duration) {
        let timer = duration;
        countdown = setInterval(function() {
            timerDisplay.textContent = timer;
            if (--timer < 0) {
                timer = 0;
                finishGame();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(countdown);
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            correctAnswers++;
            resultDisplay.textContent = '¡Respuesta correcta!';
        } else {
            incorrectAnswers++;
            incorrectResponses.push({
                question: questions[currentQuestionIndex].question,
                correctAnswer: questions[currentQuestionIndex].answer,
                userAnswer: userAnswer
            });
            resultDisplay.textContent = 'Respuesta incorrecta. La respuesta correcta era: ' + correctAnswer;
        }

        currentQuestionIndex++;
        answerInput.value = '';
        displayQuestion();
    }

    function finishGame() {
        stopTimer();
        let resultMessage = `Juego terminado. Tuviste ${correctAnswers} respuestas correctas y ${incorrectAnswers} respuestas incorrectas.\n\n`;

        if (incorrectResponses.length > 0) {
            resultMessage += 'Respuestas incorrectas:\n';
            incorrectResponses.forEach(function(response) {
                resultMessage += `\nPregunta: ${response.question}\nTu respuesta: ${response.userAnswer}\nRespuesta correcta: ${response.correctAnswer}\n`;
            });
        }

        alert(resultMessage +  alarmAudio.play());

        finishButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        answerInput.disabled = true;
        submitButton.disabled = true;

        // Reproducir sonido de alarma
        
       
        
    }

    submitButton.addEventListener('click', checkAnswer);
    finishButton.addEventListener('click', finishGame);
    retryButton.addEventListener('click', function() {
        location.reload();
    });

    displayQuestion();
    startTimer(30); // 1 minuto
});
