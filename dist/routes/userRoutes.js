"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const quizTakingController_1 = require("../controller/quizTakingController");
const authController_2 = require("../controller/authController");
const router = express_1.default.Router();
//route to render the signup view
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', authController_1.default.loginUser);
//route to render the signup view
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
router.post('/signup', authController_1.default.registerUser);
router.get('/profile', authController_2.profile);
//route to render the difficulty level view
router.get('/level', (req, res) => {
    res.render('levels', { title: 'Choose your difficulty' });
});
router.post('/start-quiz', quizTakingController_1.getQuestionsByDifficulty);
router.post('/submit-quiz');
exports.default = router;
