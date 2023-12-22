"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizController_1 = require("../controller/quizController");
const router = express_1.default.Router();
// Route to create a new quiz
router.post('/quiz', quizController_1.createQuiz);
// Route to get quiz questions
router.get('/quiz/:id/questions', quizController_1.getQuizQuestions);
exports.default = router;
