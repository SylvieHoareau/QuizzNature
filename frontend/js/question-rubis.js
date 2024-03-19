// question-rubis.js

// URL de l'API
const url = "http://localhost:1337/api/quizzes/12/?populate=questions";
// Déclaration des variables
let questions;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestionIndex = 0;

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
    questions = data.data.attributes.questions.data;
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
            <div class="next-button-container">
                <button class="next-button">Question suivante</button>
            </div>
        `;
        // Permet de stocker la réponse correcte
        div.setAttribute('data-correct-answer', question.attributes.correctAnswer);
        container.appendChild(div);
    })

    // Ajout de l'écouteur d'événements après avoir créés toutes les questions
    document.querySelectorAll('.next-button').forEach(button => {
        button.addEventListener('click', () => {
            // Passage à la question suivante
            goToNextQuestion();
        })
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

// Fonctionnalité pour passer à la question suivante
const goToNextQuestion = () => {
    // Vérification si l'index est valide
    if (currentQuestionIndex < questions.length -1) {
        // Passage à la question suivante
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        // Afficher la page de résultats
        const resultsSection = document.getElementById('results-section');
        showResults();
    }
}

// Fonction pour afficher la page de résultats
const showResults = () => {
    // Calcul du score final
    const score = calculateScore();

    // Affichage de la page de résultats
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    console.log('Affichage de la page de résultats');

    // Remplissage du contenu de la page
    const scoreElement = document.getElementById('score-final');
    scoreElement.innerText = score;

    // Traitement des réponses correctes
    const correctAnswersElement = document.getElementById('correct-answers');
    if (correctAnswersElement) {
        correctAnswersElement.innerText = 'Nombre de réponses correctes : ' + getCorrectAnswerCount();
    }

    // Traitement des réponses incorrectes
    const incorrectAnswersElement = document.getElementById('incorrect-answers');
    if (incorrectAnswersElement) {
        incorrectAnswersElement.innerText = 'Nombre de réponses incorrectes : ' + getIncorrectAnswersCount();
    }

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
        // Réinitialisation du score et des réponses
        score = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;

        // Masquer la section des résultats
        resultsSection.style.display = 'none';

        // Réinitailiser l'index de la question
        currentQuestionIndex = 0;

        // Afficher la première question
        showQuestion(currentQuestionIndex);
    })
}

// Fonction pour calculer le score final
const calculateScore = () => {
    const percentage = (correctAnswers / questions.length) * 100;
    return Math.round(percentage);

}

// Fonction pour obtenir le nombre de réponses correctes
const getCorrectAnswerCount = () => {
    // Comptage des réponses correctes
    let correctAnswers = 0;
    const questions = document.querySelectorAll('.question');
    for (let i = 0; i < questions.length; i++) {
        const radios = questions[i].querySelectorAll('input[type="radio"]');
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked && radios[j].value === questions[i].dataset.correctAnswer) {
                correctAnswers++;
                break;
            }
        }
    }
    return correctAnswers;
}

// Fonction pour obtenir le nombre de réponses incorrectes
const getIncorrectAnswersCount = () => {
    // Calcul du nombre de réponses incorrectes
    const questions = document.querySelectorAll('.question');
    return questions.length - correctAnswers;
}

// Affichage de la page de résultats à la fin du quiz
document.addEventListener('click', (event) => {
   if (event.target.classList.contains('next-button')) {
        // Passage à la question suivante
        goToNextQuestion();
    }
})

