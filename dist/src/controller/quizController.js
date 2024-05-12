"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Question_1 = __importDefault(require("../model/Question"));
const submitQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch correct answers from the database
        const correctAnswers = yield Question_1.default.findAll({ attributes: ['id', 'correctAnswer'] });
        const quizData = req.body;
        // Calculate score and correct/incorrect answers
        let score = 0;
        const correctAnswersList = [];
        const incorrectAnswersList = [];
        for (const questionId in quizData) {
            const userAnswer = quizData[questionId];
            const correctAnswerObj = correctAnswers.find(answer => answer.id === Number(questionId));
            if (correctAnswerObj) {
                const correctAnswer = correctAnswerObj.correctAnswer;
                if (userAnswer === correctAnswer) {
                    score++; // Increment score for each correct answer
                    correctAnswersList.push(`Question ${questionId}: ${userAnswer}`);
                }
                else {
                    incorrectAnswersList.push(`Question ${questionId}: ${userAnswer} (Correct Answer: ${correctAnswer})`);
                }
            }
            else {
                // Handle case where question ID is not found (invalid submission)
                console.warn(`No correct answer found for question ID: ${questionId}`);
            }
        }
        // Prepare response data
        const responseData = {
            score: score,
            correctAnswers: correctAnswersList,
            incorrectAnswers: incorrectAnswersList,
        };
        // Send response with quiz result
        res.json(responseData);
    }
    catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = submitQuiz;
