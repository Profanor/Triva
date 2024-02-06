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
router.get('/admin', showDashboard);

// Display the form for adding a new question
router.get('/admin/addQuestion', showAddQuestionForm);

// Handle the submission of a new question
router.post('/admin/addQuestion', addQuestion);

// Display a list of existing questions
router.get('/admin/questionList', showQuestionList);

router.get('/admin/editQuestion/:questionId', editQuestion)

// display the quiz form
router.get('/admin/createQuiz', showQuizForm);

// handle quiz creation
router.post('/admin/createQuiz', createQuiz);

export default router;