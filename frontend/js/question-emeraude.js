// question-emeraude.js

// URL de l'API
const url = "http://localhost:1337/api/quizzes/13/?populate=questions";
let score = 0;

// Récupération des données de l'API
fetch(url)
    .then(response => response.json())
    .then(data => {
        const questions = data.data.attributes.questions.data;
        const container = document.getElementById('quizz-container');

        // Affichage des questions une par une
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
            .catch(error => console.error('Erreur:', error));
    })

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