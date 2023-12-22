import { Sequelize } from 'sequelize';
import Question from '../model/Question';
import Quiz from '../model/Quiz';

// Function to fetch quiz questions based on quiz details
const generateQuizQuestions = async (quiz: Quiz) => {
    try {
        const questions = await Question.findAll({
            where: {
                quizId: quiz.id,
            },
            order: Sequelize.literal('RAND()'), //randomize the order
        });

        return questions;
    } catch (error) {
        console.error('Error generating quiz questions:', error);
        throw error;
    }
};

export default generateQuizQuestions;