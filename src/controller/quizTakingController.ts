import { Request, Response } from 'express';
import Quiz from '../model/Quiz';
import User from '../model/User';
import QuizHistory from '../model/QuizHistory';
import generateQuizQuestions from '../utils/quizUtils';

// Extend the Express Request type to include a user property
interface AuthenticatedRequest extends Request {
    user: User;
  }

export const startQuiz = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const quizId = req.params.quizId;

        // Fetch the quiz
        const quiz = await Quiz.findByPk(quizId);
        
        if (!quiz) {
            res.status(404).json({ error: 'Quiz not found' });
            return;
        }

        const quizQuestions = generateQuizQuestions(quiz);

        // Save the quiz in progress to the user's quiz history
        await QuizHistory.create({
            userId,
            quizId,
            status: 'in-progress',
            answers: [], 
            startTime: new Date(),
        });

        res.status(200).json({ message: 'Quiz started', quiz: quizQuestions });
    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};