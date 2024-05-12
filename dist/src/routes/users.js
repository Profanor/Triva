"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playerController_1 = require("../controller/playerController");
const quizTakingController_1 = require("../controller/quizTakingController");
const playerController_2 = require("../controller/playerController");
const quizController_1 = __importDefault(require("../controller/quizController"));
const router = express_1.default.Router();
//route to render the login view
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', playerController_1.loginUser);
//route to render the signup view
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
router.post('/signup', playerController_1.registerUser);
router.get('/profile', playerController_2.profile);
//route to render the difficulty level view
router.get('/level', (req, res) => {
    res.render('levels', { title: 'Choose your difficulty' });
});
router.post('/start-quiz', quizTakingController_1.getQuestionsByDifficulty);
router.post('/submit-quiz', quizController_1.default);
exports.default = router;
