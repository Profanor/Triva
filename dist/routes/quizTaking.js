"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and models
const express_1 = __importDefault(require("express"));
const Quiz_1 = __importDefault(require("../model/Quiz"));
const quizUtils_1 = __importDefault(require("../utils/quizUtils"));
const router = express_1.default.Router();
// Route to start a quiz session
router.get('/quizTaking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Fetch the quiz
        const quiz = await Quiz_1.default.findByPk(id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        // Generate and retrieve quiz questions
        const quizQuestions = await (0, quizUtils_1.default)(quiz);
        // Pass the quiz details and questions to the quiz-taking EJS template
        res.render('quizTaking', { title: 'Quiz Session', quiz, quizQuestions });
    }
    catch (error) {
        console.error('Error starting quiz session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Additional routes for submitting quiz answers, ending the quiz, etc. can be added as needed
exports.default = router;
