document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        { question: '¿Cuál es la capital de España?', answer: '' },
        { question: '¿Quién escribió Don Quijote de la Mancha?', answer: '' },
        { question: '¿Cuántos continentes hay en el mundo?', answer: '' },
        { question: '¿Cuál es el animal más rápido del mundo?', answer: '' },
        { question: '¿En qué año llegó el hombre a la Luna?', answer: '' }
    ];

    const timerDisplay = document.getElementById('countdown');
    const quizForm = document.getElementById('quiz-form');
    const finishButton = document.getElementById('finish');
    const retryButton = document.getElementById('retry');
    const alarmAudio = document.getElementById('alarmAudio');

    let currentQuestionIndex = 0;
    let countdown;

    function displayQuestions() {
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');
            questionDiv.innerHTML = `
                <label for="answer${index}">${question.question}</label>
                <input type="text" id="answer${index}" name="answer${index}" required>
            `;
            document.getElementById('questions-container').appendChild(questionDiv);
        });
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

    function finishGame() {
        stopTimer();
        
        // Recolectar respuestas del usuario
        const userAnswers = [];
        questions.forEach((question, index) => {
            const userAnswer = document.getElementById(`answer${index}`).value.trim();
            userAnswers.push({ question: question.question, answer: userAnswer });
        });

        // Generar mensaje para el alert con las respuestas y la fecha
        let resultMessage = 'Respuestas:\n';
        userAnswers.forEach(answer => {
            resultMessage += `\nPregunta: ${answer.question}\nRespuesta: ${answer.answer}\n`;
        });

        // Agregar la fecha actual al mensaje
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        resultMessage += `\n\nFecha de la prueba: ${formattedDate}`;

        alert(resultMessage + alarmAudio.play());

        finishButton.disabled = true;
        retryButton.style.display = 'inline-block';
        quizForm.querySelectorAll('input').forEach(input => {
            input.disabled = true;
        });

        
        
    }

    finishButton.addEventListener('click', finishGame);
    retryButton.addEventListener('click', function() {
        location.reload();
    });

    displayQuestions();
    startTimer(30); // 30 segundos
});
