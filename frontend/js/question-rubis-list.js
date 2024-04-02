// question-rubis-list.js

// Déclaration des variables avant leur utilisation
let answeredQuestions = 0; // Déclaration et initialisation de la variable answeredQuestion

let totalQuestions; // Déclaration de la variable totalQuestions

let score = 0;

// Définition de la fonction validateAnswer avant son utilisation
const validateAnswer = (
  questionName,
  correctAnswer,
  correctAnswerDescription,
  index
) => {
  console.log("questionName :", questionName);
  console.log("correctAnswer :", correctAnswer);
  console.log("correctAnswerDescription :", correctAnswerDescription);
  const radios = document.getElementsByName(questionName);
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      if (correctAnswer !== undefined && radios[i].value === correctAnswer) {
        score++;
        const correctAnswerElement = document.getElementById(
          `correctAnswer${index}`
        );
        const correctAnswerDescriptionElement = document.getElementById(
          `correctAnswerDescription${index}`
        );
        document.getElementById("score").innerText = score;
        if (correctAnswerElement) {
          correctAnswerElement.style.display = "block"; // Affiche la réponse
        }
        if (correctAnswerDescriptionElement) {
          correctAnswerDescriptionElement.style.display = "block"; // Affiche l'explication de la réponse
        }
      }
      break;
    }
  }
  answeredQuestions++; // Incrémentez le nombre de questions répondues
  console.log("Nombre de questions répondues : ", answeredQuestions);
  if (answeredQuestions === totalQuestions) {
    // Toutes les questions ont été répondues, valider le questionnaire et afficher le score final
    const finalScoreElement = document.getElementById("final-score");
    const resultElement = document.getElementById("result");
    const resultContainer = document.getElementById("result-container");

    finalScoreElement.innerText = score;
    resultElement.innerText =
      score === totalQuestions
        ? "Félicitations, vous avez correctement répondu correctement à toutes les questions !"
        : "Désolé, vous avez répondu incorrectement à certaines questions.";
    resultContainer.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // URL de l'API
  const url = "http://localhost:1337/api/quizzes/12/?populate=questions";

  // Récupération des données de l'API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const questions = data.data.attributes.questions.data;
      const container = document.getElementById("quizz-container");

      // Affichage des questions une par une
      questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
                    <div class="question-header">
                        <h2>Question ${index + 1}</h2>
                        <p>${question.attributes.text}</p>
                    </div>
                    <div class="question-body">
                        <div>
                            <input type="radio" value="a" name="questions${index}" id="a${index}" checked/>
                            <label for="a${index}">${
          question.attributes.a
        }</label>
                        </div>
                        <div>
                            <input type="radio" value="b" name="questions${index}" id="b${index}"/>
                            <label for="b${index}">${
          question.attributes.b
        }</label>
                        </div>
                        <div>
                            <input type="radio" value="c" name="questions${index}" id="c${index}"/>
                            <label for="c${index}">${
          question.attributes.c
        }</label>
                        </div>
                        <div>
                            <input type="radio" value="d" name="questions${index}" id="d${index}"/>
                            <label for="d${index}">${
          question.attributes.d
        }</label>
                        </div>
                    </div>
                    <div>
                        <input type="button" value="Valider" onclick="validateAnswer('questions${index}', '${
          question.attributes.correctAnswer
        }', '${question.attributes.correctAnswerDescription}', '${index}')"/>
                    </div>
                    <div>
                        <p id="correctAnswer${index}" style="display: none;">La bonne réponse est : ${
          question.attributes.correctAnswer
        }</p>
                        <p id="correctAnswerDescription${index}" style="display: none;">${
          question.attributes.correctAnswerDescription
        }</p>
                    </div>
                `;
        container.appendChild(div);
      });
      totalQuestions = questions.length; // Initialisation de la variable totalQuestions
      console.log("Nombre total de questions : ", totalQuestions);
    })
    .catch((error) => console.error("Erreur:", error));

  // Sélectionnez le bouton "Recommencer"
  const resetButton = document.getElementById("resetBtn");

  // Ajoutez une gestionnaire d'événements pour le clic sur le bouton "Recommencer"
  resetButton.addEventListener("click", () => {
    // Réinitialiser le score et le nombre de questions répondues
    score = 0;
    answeredQuestions = 0;

    // Réinitialiser l'affichage du score final et du resultat
    document.getElementById("final-score").innerText = "";
    document.getElementById("result").innerText = "";
    document.getElementById("result-container").style.display = "none";

    // Déterminer le conteneur des questions
    const container = document.getElementById("quizz-container");

    // Supprimer toutes les questions actuelles du container
    container.innerHTML = "";

    // Récupérez à nouveau les questions depuis l'API et les réafficher
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const questions = data.data.attributes.questions.data;
        const container = document.getElementById("quizz-container");

        // Affichage des questions une par une
        questions.forEach((question, index) => {
          const div = document.createElement("div");
          div.className = "question";
          div.innerHTML = `
                    <div class="question-header">
                        <h2>Question ${index + 1}</h2>
                        <p>${question.attributes.text}</p>
                    </div>
                    <div class="question-body">
                        <div>
                            <input type="radio" value="a" name="questions${index}" id="a${index}" checked/>
                            <label for="a${index}">${
            question.attributes.a
          }</label>
                        </div>
                        <div>
                            <input type="radio" value="b" name="questions${index}" id="b${index}"/>
                            <label for="b${index}">${
            question.attributes.b
          }</label>
                        </div>
                        <div>
                            <input type="radio" value="c" name="questions${index}" id="c${index}"/>
                            <label for="c${index}">${
            question.attributes.c
          }</label>
                        </div>
                        <div>
                            <input type="radio" value="d" name="questions${index}" id="d${index}"/>
                            <label for="d${index}">${
            question.attributes.d
          }</label>
                        </div>
                    </div>
                    <div>
                        <input type="button" value="Valider" onclick="validateAnswer('questions${index}', '${
            question.attributes.correctAnswer
          }', '${question.attributes.correctAnswerDescription}', '${index}')"/>
                    </div>
                    <div>
                        <p id="correctAnswer${index}" style="display: none;">La bonne réponse est : ${
            question.attributes.correctAnswer
          }</p>
                        <p id="correctAnswerDescription${index}" style="display: none;">${
            question.attributes.correctAnswerDescription
          }</p>
                    </div>
                `;
          container.appendChild(div);
        });
        console.log("Questionnaire réinitialisé");
      })
      .catch((error) => console.error("Erreur:", error));
  });
});
