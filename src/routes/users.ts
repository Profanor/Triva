import express from 'express';
import { loginUser, registerUser } from '../controller/playerController';
import { getQuestionsByDifficulty } from '../controller/quizTakingController';
import { profile } from '../controller/playerController'
import submitQuiz from '../controller/quizController';

const router = express.Router();

//route to render the login view
router.get('/login', (req, res)=> {
  res.render('login', { title: 'Login' });  
});
router.post('/login', loginUser)

//route to render the signup view
router.get('/signup', (req, res)=> {
  res.render('signup', { title: 'Sign Up' });  
});

router.post('/signup', registerUser)

router.get('/profile', profile);

//route to render the difficulty level view
router.get('/level', (req, res)=> {
  res.render('levels', { title: 'Choose your difficulty' });  
});

router.post('/start-quiz', getQuestionsByDifficulty)
router.post('/submit-quiz', submitQuiz )
export default router;