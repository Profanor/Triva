"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizQuestions = exports.createQuiz = void 0;
const Quiz_1 = __importDefault(require("../model/Quiz"));
const Question_1 = __importDefault(require("../model/Question"));
const quizUtils_1 = __importDefault(require("../utils/quizUtils"));
const createQuiz = async (req, res) => {
    try {
        // Extract quiz details from the request body
        const { id, timeLimit, difficulty } = req.body;
        // Create the quiz
        const newQuiz = await Quiz_1.default.create({
            id,
            timeLimit,
            difficulty,
        });
        //fetch questions based on difficulty
        const questions = await Question_1.default.findAll({
            where: { difficulty },
        });
        console.log('Questions', questions);
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    }
    catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createQuiz = createQuiz;
const getQuizQuestions = async (req, res) => {
    try {
        const quizId = Number(req.params.id); //incase the quizid is a string in the url params
        const difficulty = req.params.difficulty;
        // Fetch the quiz and its associated questions
        const quiz = await Quiz_1.default.findByPk(quizId, {
            include: Question_1.default
        });
        if (!quiz) {
            console.error(`Quiz with ID ${quizId} not found.`);
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }
        // Generate and retrieve quiz questions
        const quizQuestions = await (0, quizUtils_1.default)(quiz);
        res.status(200).json({ quizQuestions });
    }
    catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getQuizQuestions = getQuizQuestions;
exports.default = { createQuiz: exports.createQuiz, getQuizQuestions: exports.getQuizQuestions };
