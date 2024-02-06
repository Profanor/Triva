"use strict";
// import { Request, Response } from 'express';
// import Quiz from '../model/Quiz';
// import Question from '../model/Question';
// import generateQuizQuestions from '../utils/quizUtils';
// export const createQuiz = async (req: Request, res: Response): Promise<void> => {
//     try {
//         // Extract quiz details from the request body
//         const { id, timeLimit, difficulty } = req.body;
//         // Create the quiz
//         const newQuiz = await Quiz.create({
//             id,
//             timeLimit,
//             difficulty,
//         });
//         //fetch questions based on difficulty
//         const questions = await Question.findAll({
//             where: { difficulty },
//         });
//         console.log('Questions', questions)
//         res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
//     } catch (error) {
//         console.error('Error creating quiz:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
// export const getQuizQuestions = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const quizId = Number(req.params.id); //incase the quizid is a string in the url params
//         const difficulty = req.params.difficulty;
//         // Fetch the quiz and its associated questions
//         const quiz = await Quiz.findByPk(quizId, {
//             include: Question
//         });
//         if (!quiz) {
//             console.error(`Quiz with ID ${quizId} not found.`);
//             res.status(404).json({ error: 'Quiz not found' });
//             return;
//         }
//         // Generate and retrieve quiz questions
//         const quizQuestions = await generateQuizQuestions(quiz);
//         res.status(200).json({ quizQuestions });
//     } catch (error) {
//         console.error('Error fetching quiz questions:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
// export default { createQuiz, getQuizQuestions }
