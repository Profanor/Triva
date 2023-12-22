"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const router = express_1.default.Router();
// Display the admin dashboard
router.get('/adminRoutes', adminController_1.showDashboard);
// Display the form for adding a new question
router.get('/adminRoutes/addQuestion', adminController_1.showAddQuestionForm);
// Handle the submission of a new question
router.post('/adminRoutes/addQuestion', adminController_1.addQuestion);
// Display a list of existing questions
router.get('/adminRoutes/questionList', adminController_1.showQuestionList);
// display the quiz form
router.get('/adminRoutes/createQuiz', adminController_1.renderQuizForm);
// handle quiz creation
router.post('/adminRoutes/createQuiz', adminController_1.createQuiz);
exports.default = router;
