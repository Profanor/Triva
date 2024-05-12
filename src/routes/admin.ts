import express from 'express';
import {
  showDashboard,
  showAddQuestionForm,
  addQuestion,
  showQuestionList,
  showQuizForm,
  createQuiz,
  editQuestion
} from '../controller/adminController';

const router = express.Router();

// Display the admin dashboard
router.get('/', showDashboard);

// Display the form for adding a new question
router.get('/addQuestion', showAddQuestionForm);

// Handle the submission of a new question
router.post('/addQuestion', addQuestion);

// Display a list of existing questions
router.get('/questionList', showQuestionList);

router.get('/editQuestion/:questionId', editQuestion)

// display the quiz form
router.get('/createQuiz', showQuizForm);

// handle quiz creation
router.post('/createQuiz', createQuiz);

export default router;