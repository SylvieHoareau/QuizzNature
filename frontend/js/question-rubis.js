// question-rubis.js

 // URL de l'API
 const url = "http://localhost:1337/api/quizzes/12/?populate=questions";
 let score = 0;

 // Fonction pour afficher une question
 const showQuestion = (index) => {
    const questions = document.querySelectorAll('.question');
    console.log(questions.length);
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }
    questions[index].style.display = 'block';
 }

 // Récupération des données de l'API
 fetch(url)
     .then(response => response.json())
     .then(data => {
         const questions = data.data.attributes.questions.data;
         const container = document.getElementById('quizz-container');

         // Affichage des questions et affichage de la première
         questions.forEach((question, index) => {
             const div = document.createElement('div');
             div.className = 'question';
             div.innerHTML = `
                 <div class="question-header">
                     <h2>Question ${index + 1}</h2>
                     <p>${question.attributes.text}</p>
                 </div>
                 <div class="question-body">
                     <div>
                         <input type="radio" value="a" name="questions${index}" id="a${index}" checked/>
                         <label for="a${index}">${question.attributes.a}</label>
                     </div>
                     <div>
                         <input type="radio" value="b" name="questions${index}" id="b${index}"/>
                         <label for="b${index}">${question.attributes.b}</label>
                     </div>
                     <div>
                         <input type="radio" value="c" name="questions${index}" id="c${index}"/>
                         <label for="c${index}">${question.attributes.c}</label>
                     </div>
                     <div>
                         <input type="radio" value="d" name="questions${index}" id="d${index}"/>
                         <label for="d${index}">${question.attributes.d}</label>
                     </div>
                 </div>
                 <div>
                     <input type="button" value="Valider" onclick="validateAnswer('questions${index}', '${question.attributes.correctAnswer}')"/>
                 </div>
                 <div>
                     <p id="correctAnswer${index}"></p>
                 </div>
             `;
             container.appendChild(div);
         })
            // Affichage de la première question
            showQuestion(0);
        })
        .catch(error => console.error('Erreur:', error));

 const validateAnswer = (questionName, correctAnswer, index) => {
     console.log('questionName :', questionName);
     console.log('correctAnswer :', correctAnswer);
     const radios = document.getElementsByName(questionName);
     for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (correctAnswer !== undefined && radios[i].value === correctAnswer) {
                score++;
                const correctAnswerElement = document.getElementById(`correctAnswer${index}`);
                document.getElementById('score').innerText = score;
                if (correctAnswerElement) {
                    correctAnswerElement.innerText = "La bonne réponse est : " + correctAnswer;
                }
            }
            break;
        }
    }
}

// Fonctionnalité pour passer à la question suivante (optionnelle)
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    // Passage à la question suivante
    let currentQuestionIndex = 0;
    // Incrémenter l'index avant de passer à la question suivante
    currentQuestionIndex++;
    const currentQuestion = document.querySelectorAll('.question')[currentQuestionIndex];
    currentQuestion.style.display = 'none';

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        // Afficher la page de résultats
        const resultsSection = document.getElementById('results-section');
        showResults();
    }
})

let correctAnswers = 0;
let incorrectAnswers = 0;

// Fonction pour afficher la page de résulats
const showResults = () => {
    // Calcul du score final
    const score = calculateScore();

    // Affichage de la page de résultats
    resultsSection.style.display = 'block';
    console.log('Affichage de la page de résultats');

    // Remplissage du contenu de la page
    const scoreElement = document.getElementById('score-final');
    scoreElement.innerText = score;

    const correctAnswersElement = document.getElementById('correct-anwsers');
    correctAnswersElement.innerText = 'Nombre de réponses correctes : ' + getCorrectAnswerCount();

    const incorrectAnswersElement = document.getElementById('incorrect-answers');
    incorrectAnswersElement.innerText = 'Nombre de réponses incorrectes : ' + getIncorrectAnswersCount();

    // Ajout de commentaires et d'encouragements
    const feedbackElement = document.getElementById('feedback');
    if (score >= 80) {
        feedbackElement.innerText = "Excellent travail ! Vous avez réussi le quizz !";
    } else if (score >= 50) {
        feedbackElement.innerText = "Bravo ! Vous avez acquis de bonnes connaissances.";
    } else {
        feedbackElement.innerText = "Ne vous découragez pas ! Vous pouvez recommencer le quiz et améliorer votre score. ";
    }

    // Bouton pour recommencer le quiz
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        // Code pour recommencer le quiz
        // Réinitialisation du score et des réponses
        score = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;

        // Masquer la section des résultats
        resultsSection.style.display = 'none';

        // Réinitailiser l'index de la question
        currentQuestionIndex = 0;

        // Afficher la première question
        showQuestion(currentQuestion);

    })
}

// Fonction pour calculer le score final
const calculateScore = () => {
    // Calcul du prourcentage de réponse correctes
    const percentage = (correctAnswers / questions.length) * 100;
    return Math.round(percentage);

}

// Fonction pour obtenir le nombre de réponses correctes
const getCorrectAnswerCount = () => {
    // Comptage des réponses correctes
    return correctAnswers;

}

// Fonction pour obtenir le nombre de réponses incorrectes
const getIncorrectAnswersCount = () => {
    // Comptage des réponses incorrectes
    return incorrectAnswers;

}

// Affichage de la page de résultats à la fin du quiz
nextButton.addEventListener('click', () => {
    // Vérification de l'index de la question et affichage de la page de résultats
    if (currentQuestionIndex === questions.length -1) {
        // Affichage de la page de résultats
        showResults();
    } else {
        // Passage à la question suivante
        showQuestion(currentQuestionIndex + 1);
    }
})

