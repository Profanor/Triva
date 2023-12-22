import express from 'express';
import User from '../model/User';
import { Request, Response } from 'express';
import { comparePassword } from '../utils/password';

const router = express.Router();

//route to render the signup view
router.get('/login', (req, res)=> {
  res.render('login', { title: 'Login' });  
});

router.post('/login',  async (req: Request, res:Response)=> {
    try {

        //extract form data from the req body
        const { email, password } = req.body;

        console.log('request body:', req.body); //debugging
        
        // fetch the user from the database
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }

        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        //passwords match, redirect to user profile
        res.redirect(`/profile?email=${user.email}`);
        console.log('logged in successfully');
        
    } catch(error) {
    console.error('Error during login:', error);
    // Redirect back to the login page with an error message
    res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});

export default router;