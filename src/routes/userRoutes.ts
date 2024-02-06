import express from 'express';
import authController, { profile } from '../controller/authController';
import { getQuestionsByDifficulty } from '../controller/quizTakingController';

const router = express.Router();

//route to render the signup view
router.get('/login', (req, res)=> {
  res.render('login', { title: 'Login' });  
});
router.post('/login', authController.loginUser)

//route to render the signup view
router.get('/signup', (req, res)=> {
  res.render('signup', { title: 'Sign Up' });  
});

router.post('/signup', authController.registerUser)

//route to render the difficulty level view
router.get('/level', (req, res)=> {
  res.render('levels', { title: 'Choose your difficulty' });  
});

router.get('/profile', profile);
router.post('/start-quiz', getQuestionsByDifficulty)

export default router;