'use strict';

/**
 * quizz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quizz.quizz');

/* module.exports = {
    async score(ctx) {
        const { id } = ctx.params;
        let userAnswers = ctx.request.body;

        let quizz = await strapi.services.quizz.findOne({ id }, ['questions']);

        let question;
        let score = 0;

        if (quizz) {
            userAnswers.map((userAnsw) => {
                question = quizz.questions.find((qst) => qst.id === userAnsw.questionId);
                if (question) {
                    if (question.answer === userAnsw.value) {
                        userAnsw.correct = true;
                        score += 1;
                    } else {
                        userAnsw.correct = false;
                    }

                    userAnsw.correctValue = question.answer;
                }

                return userAnsw;
            });
        }

        const questionCount = quizz.questions.length;

        delete quizz.questions;

        return { quizz, score, scoredAnswers: userAnswers, questionCount };
    }
}; */
