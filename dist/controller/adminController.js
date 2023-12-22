"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.editQuiz = exports.createQuiz = exports.renderQuizForm = exports.showQuestionList = exports.addQuestion = exports.showAddQuestionForm = exports.showDashboard = void 0;
const Quiz_1 = __importDefault(require("../model/Quiz"));
const Question_1 = __importDefault(require("../model/Question"));
// display admin dashboard 
const showDashboard = (req, res) => {
    res.render('adminPanel', { title: 'Admin Dashboard' });
};
exports.showDashboard = showDashboard;
// display form for adding a new question
const showAddQuestionForm = (req, res) => {
    res.render('addQuestion', { title: 'Add Question Form' });
};
exports.showAddQuestionForm = showAddQuestionForm;
// Handle the submission of a new question
const addQuestion = async (req, res) => {
    try {
        // Extract question details from the request body
        const { text, options, category, correctAnswer, difficulty } = req.body;
        // TODO: Validate and save the question details to the database
        const newQuestion = await Question_1.default.create({
            text,
            options,
            category,
            correctAnswer,
            difficulty,
        });
        const successMessage = 'Question added successfully';
        res.redirect('/admin');
    }
    catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addQuestion = addQuestion;
// Display a list of existing questions
const showQuestionList = async (req, res) => {
    try {
        // TODO: Fetch existing questions from the database
        const questions = await Question_1.default.findAll();
        res.render('admin/questionList', { title: 'Question List', questions });
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.showQuestionList = showQuestionList;
const renderQuizForm = (req, res) => {
    res.render('createQuiz', { title: 'Quiz Form' });
};
exports.renderQuizForm = renderQuizForm;
const createQuiz = async (req, res) => {
    try {
        const { id, timeLimit, difficulty } = req.body;
        // fetch questions based on difficulty
        const questions = await Question_1.default.findAll({
            where: { difficulty },
        });
        if (!questions || questions.length === 0) {
            res.status(404).json({ error: 'No questions found for the specified difficulty' });
            return;
        }
        //create the quiz
        const newQuiz = await Quiz_1.default.create({
            id,
            timeLimit,
            difficulty,
        });
        //associate questions with the quiz
        await newQuiz.setQuestions(questions);
        res.status(201).json({
            success: true,
            message: 'Quiz created successfully',
            quiz: newQuiz,
        });
    }
    catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.createQuiz = createQuiz;
const editQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { timeLimit, difficulty, questions } = req.body;
        // Fetch the quiz
        const quiz = await Quiz_1.default.findByPk(quizId);
        if (!quiz) {
            res.status(404).json({ success: false, error: 'Quiz not found' });
            return;
        }
        // Update quiz details
        await quiz.update({
            timeLimit,
            difficulty,
        });
        res.status(200).json({ success: true, message: 'Quiz updated successfully', quiz });
    }
    catch (error) {
        console.error('Error editing quiz:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.editQuiz = editQuiz;
const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        // Fetch the quiz
        const quiz = await Quiz_1.default.findByPk(quizId);
        if (!quiz) {
            res.status(404).json({ success: false, error: 'Quiz not found' });
            return;
        }
        // Delete the quiz
        await quiz.destroy();
        res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.deleteQuiz = deleteQuiz;
