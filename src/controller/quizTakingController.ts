import { Request, Response } from 'express';
import QuizHistory from '../model/QuizHistory';
import Question from '../model/Question';

export const getQuestionsByDifficulty = async (req: Request, res: Response): Promise<void> => {
    try {       
        const { difficulty } = req.body;

        // Find the quiz based on the selected difficulty
        const questions = await Question.findAll({
            where: { difficulty },
        });        

        if (questions.length === 0) {
            res.status(404).json({ message: 'Questions not found for the specified difficulty' });
            return;
        }

        // Save the quiz in progress to the user's quiz history
        await QuizHistory.create({
            status: 'in-progress',
            answers: [], 
            startTime: new Date(),
        });

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};