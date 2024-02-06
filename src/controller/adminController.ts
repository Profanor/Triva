import { NextFunction, Request, Response } from 'express';
import Quiz from '../model/Quiz';
import Question from '../model/Question';

// display admin dashboard 
export const showDashboard = (req: Request, res: Response): void => {
  res.render('adminPanel', { title: 'Admin Dashboard' });
}

// display form for adding a new question
export const showAddQuestionForm = (req: Request, res: Response): void => {

  const quizId = req.params.quizId;
  res.render('addQuestion', { title: 'Add Question Form', quizId });
};

export const showQuizForm = (req: Request, res: Response): void => {
  res.render('createQuiz', { title: 'Quiz Form' });
};


// Handle the submission of a new question
export const addQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract question details from the request body
    const { text, options, category, correctAnswer, difficulty } = req.body as {
      text: string;
      options: string;
      category: string;
      correctAnswer: string;
      difficulty: string;
    };

    console.log('Req body', req.body);

    // Check if a quiz with the specified difficulty exists
    let quiz = await Quiz.findOne({ where: { difficulty } });

    // If no quiz exists for the specified difficulty, create a new one
    if (!quiz) {
      const { timeLimit, difficulty } = req.body; 
      quiz = await Quiz.create({ timeLimit, difficulty });
      
      if (!quiz) {
        res.status(500).json({ error: 'failed to create quiz' });
        return;
      }
    }
    
    // associate the new question with the existing quiz
    const newQuestion = await Question.create({
      text,
      options,
      category,
      correctAnswer,
      difficulty,
    });

    console.log('Question created successfully:', newQuestion);
    res.redirect('/admin/createQuiz');
} catch (error: any) {
    console.error('Error adding question:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message, 
      requestBody: req.body 
    });
  }
};

// logic for editing questions
export const editQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionId } = req.params;

    //fetch the existing question from the database
    const existingQuestion = await Question.findByPk(questionId);

    if(!existingQuestion) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    // Convert options to an array if it's not already
    existingQuestion.options = Array.isArray(existingQuestion.options)
    ? existingQuestion.options
    : [existingQuestion.options] as any;

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
  } catch (error) {
    console.error('Error editing question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Display a list of existing questions
export const showQuestionList = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Fetch existing questions from the database
    const questions = await Question.findAll();

    res.render('questionList', { title: 'Question List', questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, timeLimit, difficulty } = req.body;

    // fetch questions based on difficulty
    const questions = await Question.findAll();

    console.log('Difficulty:', difficulty);
    console.log('Questions:', questions);

    if (!questions || questions.length === 0) {
      console.log('No questions found for the specified difficulty');
      res.status(404).json({ error: 'No questions found for the specified difficulty', difficulty });
      return
    }

    //create the quiz
    const newQuiz = await Quiz.create({
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
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const editQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quizId } = req.params;
    const { timeLimit, difficulty } = req.body;

    // Fetch the quiz
    const quiz = await Quiz.findByPk(quizId);

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
  } catch (error) {
    console.error('Error editing quiz:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const deleteQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quizId } = req.params;

    // Fetch the quiz
    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      res.status(404).json({ success: false, error: 'Quiz not found' });
      return;
    }

    // Delete the quiz
    await quiz.destroy();

    res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};