// Import necessary modules and models
import express, { Request, Response } from 'express';
import Quiz from '../model/Quiz';
import generateQuizQuestions from '../utils/quizUtils';

const router = express.Router();

// Route to start a quiz session
router.get('/quizTaking/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Fetch the quiz
        const quiz = await Quiz.findByPk(id);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Generate and retrieve quiz questions
        const quizQuestions = await generateQuizQuestions(quiz);

        // Pass the quiz details and questions to the quiz-taking EJS template
        res.render('quizTaking', { title: 'Quiz Session', quiz, quizQuestions });
    } catch (error) {
        console.error('Error starting quiz session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Additional routes for submitting quiz answers, ending the quiz, etc. can be added as needed

export default router;