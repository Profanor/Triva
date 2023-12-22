"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startQuiz = void 0;
const Quiz_1 = __importDefault(require("../model/Quiz"));
const QuizHistory_1 = __importDefault(require("../model/QuizHistory"));
const quizUtils_1 = __importDefault(require("../utils/quizUtils"));
const startQuiz = async (req, res) => {
    try {
        const userId = req.user.id;
        const quizId = req.params.quizId;
        // Fetch the quiz
        const quiz = await Quiz_1.default.findByPk(quizId);
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }
        const quizQuestions = (0, quizUtils_1.default)(quiz);
        // Save the quiz in progress to the user's quiz history
        await QuizHistory_1.default.create({
            userId,
            quizId,
            status: 'in-progress',
            answers: [],
            startTime: new Date(),
        });
        res.status(200).json({ message: 'Quiz started', quiz: quizQuestions });
    }
    catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.startQuiz = startQuiz;
