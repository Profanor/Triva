import express from 'express';
import User from '../model/User';
import { hashPassword } from '../utils/password';

const router = express.Router();

//route to render the signup view
router.get('/signup', (req, res)=> {
  res.render('signup', { title: 'Sign Up' });  
});

router.post('/signup', async( req, res)=> {
  try {
    const { 
      fullname,
      email, 
      password,
      gender,
      phone,
      address,
      theme
    } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    //hash the password before storing it in utils function
    const hashedPassword = await hashPassword(password);

    // create a new user in the database
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      gender,
      address,
      phone,
      theme,
    });
    res.redirect('/login');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;