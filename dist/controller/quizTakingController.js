"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsByDifficulty = void 0;
const QuizHistory_1 = __importDefault(require("../model/QuizHistory"));
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
        // Save the quiz in progress to the user's quiz history
        await QuizHistory_1.default.create({
            status: 'in-progress',
            answers: [],
            startTime: new Date(),
        });
        res.status(200).json({ questions });
    }
    catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getQuestionsByDifficulty = getQuestionsByDifficulty;
