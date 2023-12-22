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
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password, gender, phone, address, theme } = req.body;
        //check if user already exists
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        //hash the password before storing it in utils function
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // create a new user in the database
        const newUser = await User_1.default.create({
            fullname,
            email,
            password: hashedPassword,
            gender,
            address,
            phone,
            theme,
        });
        res.redirect('/login');
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
