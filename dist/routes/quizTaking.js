"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Quiz_1 = __importDefault(require("../model/Quiz"));
const quizUtils_1 = __importDefault(require("../utils/quizUtils"));
const router = express_1.default.Router();
// Route to start a quiz session
router.get('/quizTaking/:quizId', async (req, res) => {
    try {
        let quizId = req.params.quizId;
        console.log(quizId, "quizId");
        if (!quizId) {
            return res.status(400).json({ error: 'quiz id is required' });
        }
        // Fetch the quiz
        const quiz = await Quiz_1.default.findByPk(quizId);
        console.log(quiz, "quiz");
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        // Generate and retrieve quiz questions
        const quizQuestions = await (0, quizUtils_1.default)(quiz);
        if (!quizQuestions) {
            return res.status(500).json({ error: 'failed to generate quiz questions' });
        }
        console.log('quizQuestions:', quizQuestions);
        // Pass the quiz details and questions to the quiz-taking EJS template
        res.render('quizTaking', { title: 'Quiz Session', quiz, quizQuestions });
    }
    catch (error) {
        console.error('Error starting quiz session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
