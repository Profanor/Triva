"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsByDifficulty = void 0;
// import QuizHistory from '../model/QuizHistory';
const Question_1 = __importDefault(require("../model/Question"));
const getQuestionsByDifficulty = async (req, res) => {
    try {
        const { difficulty } = req.body;
        // Find the quiz based on the selected difficulty
        const questions = await Question_1.default.findAll({
            where: { difficulty },
        });
        if (questions.length === 0) {
            res.status(404).json({ message: 'Questions not found for the specified difficulty' });
            return;
        }
        console.log(questions);
        // Save the quiz in progress to the user's quiz history
        // await QuizHistory.create({
        //     status: 'in-progress',
        //     answers: [], 
        //     startTime: new Date(),
        // });
        res.render('startQuiz', { title: 'Start', questions });
    }
    catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ error: 'error starting the session' });
    }
};
exports.getQuestionsByDifficulty = getQuestionsByDifficulty;
