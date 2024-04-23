"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.editQuiz = exports.createQuiz = exports.showQuestionList = exports.editQuestion = exports.addQuestion = exports.showQuizForm = exports.showAddQuestionForm = exports.showDashboard = void 0;
const Quiz_1 = __importDefault(require("../model/Quiz"));
const Question_1 = __importDefault(require("../model/Question"));
// display admin dashboard 
const showDashboard = (req, res) => {
    res.render('adminPanel', { title: 'Admin Dashboard' });
};
exports.showDashboard = showDashboard;
// display form for adding a new question
const showAddQuestionForm = (req, res) => {
    const quizId = req.params.quizId;
    res.render('addQuestion', { title: 'Add Question Form', quizId });
};
exports.showAddQuestionForm = showAddQuestionForm;
const showQuizForm = (req, res) => {
    res.render('createQuiz', { title: 'Quiz Form' });
};
exports.showQuizForm = showQuizForm;
// Handle the submission of a new question
const addQuestion = async (req, res) => {
    try {
        // Extract question details from the request body
        const { text, options, category, correctAnswer, difficulty } = req.body;
        console.log('Req body', req.body);
        // Check if a quiz with the specified difficulty exists
        let quiz = await Quiz_1.default.findOne({ where: { difficulty } });
        // If no quiz exists for the specified difficulty, create a new one
        if (!quiz) {
            const { timeLimit, difficulty } = req.body;
            quiz = await Quiz_1.default.create({ timeLimit, difficulty });
            if (!quiz) {
                res.status(500).json({ error: 'failed to create quiz' });
                return;
            }
        }
        // associate the new question with the existing quiz
        const newQuestion = await Question_1.default.create({
            text,
            options,
            category,
            correctAnswer,
            difficulty,
        });
        console.log('Question created successfully:', newQuestion);
        res.redirect('/admin/createQuiz');
    }
    catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            requestBody: req.body
        });
    }
};
exports.addQuestion = addQuestion;
// logic for editing questions
const editQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        //fetch the existing question from the database
        const existingQuestion = await Question_1.default.findByPk(questionId);
        if (!existingQuestion) {
            res.status(404).json({ error: 'Question not found' });
            return;
        }
        // Convert options to an array if it's not already
        existingQuestion.options = Array.isArray(existingQuestion.options)
            ? existingQuestion.options
            : [existingQuestion.options];
        //extract  question details from the request body
        const { text, options, category, correctAnswer, difficulty } = req.body;
        // Update the existing question in the database
        await existingQuestion.update({
            text,
            options,
            category,
            correctAnswer,
            difficulty,
        });
        // Render the edit question form with existing details
        res.render('editQuestion', { title: 'Edit Question', question: existingQuestion });
    }
    catch (error) {
        console.error('Error editing question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.editQuestion = editQuestion;
// Display a list of existing questions
const showQuestionList = async (req, res) => {
    try {
        // TODO: Fetch existing questions from the database
        const questions = await Question_1.default.findAll();
        res.render('questionList', { title: 'Question List', questions });
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.showQuestionList = showQuestionList;
const createQuiz = async (req, res) => {
    try {
        const { id, timeLimit, difficulty } = req.body;
        const questions = await Question_1.default.findAll();
        console.log('Difficulty:', difficulty);
        console.log('Questions:', questions);
        if (!questions || questions.length === 0) {
            console.log('No questions found for the specified difficulty');
            res.status(404).json({ error: 'No questions found for the specified difficulty', difficulty });
            return;
        }
        //create the quiz
        const newQuiz = await Quiz_1.default.create({
            id,
            timeLimit,
            difficulty,
        });
        //associate questions with the quiz
        // await newQuiz.setQuestions(questions);
        res.status(201).send({
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
        const { timeLimit, difficulty } = req.body;
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
