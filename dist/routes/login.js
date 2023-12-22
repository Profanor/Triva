"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../model/User"));
const password_1 = require("../utils/password");
const router = express_1.default.Router();
//route to render the signup view
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', async (req, res) => {
    try {
        //extract form data from the req body
        const { email, password } = req.body;
        console.log('request body:', req.body); //debugging
        // fetch the user from the database
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        const isPasswordMatch = await (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordMatch) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        //passwords match, redirect to user profile
        res.redirect(`/profile?email=${user.email}`);
        console.log('logged in successfully');
    }
    catch (error) {
        console.error('Error during login:', error);
        // Redirect back to the login page with an error message
        res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});
exports.default = router;
