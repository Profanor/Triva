import { Request, Response } from 'express';
import Question from '../model/Question';

const submitQuiz = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch correct answers from the database
        const correctAnswers = await Question.findAll({ attributes: ['id', 'correctAnswer'] });
        const quizData = req.body;

        // Calculate score and correct/incorrect answers
        let score = 0;
        const correctAnswersList = [];
        const incorrectAnswersList = [];

        for (const questionId in quizData) {
            const userAnswer = quizData[questionId];
            const correctAnswerObj = correctAnswers.find(answer => answer.id === Number(questionId));
            
            if (correctAnswerObj) {
                const correctAnswer = correctAnswerObj.correctAnswer;
                if (userAnswer === correctAnswer) {
                    score++; // Increment score for each correct answer
                    correctAnswersList.push(`Question ${questionId}: ${userAnswer}`);
                } else {
                    incorrectAnswersList.push(`Question ${questionId}: ${userAnswer} (Correct Answer: ${correctAnswer})`);
                }
            } else {
                // Handle case where question ID is not found (invalid submission)
                console.warn(`No correct answer found for question ID: ${questionId}`);
            }
        }

        // Prepare response data
        const responseData = {
            score: score,
            correctAnswers: correctAnswersList,
            incorrectAnswers: incorrectAnswersList,
        };

        // Send response with quiz result
        res.json(responseData);
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default submitQuiz;
