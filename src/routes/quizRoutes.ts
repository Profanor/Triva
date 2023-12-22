import express from 'express';
import { createQuiz, getQuizQuestions } from '../controller/quizController';

const router = express.Router();

// Route to create a new quiz
router.post('/quiz', createQuiz);

// Route to get quiz questions
router.get('/quiz/:id/questions', getQuizQuestions);

export default router;