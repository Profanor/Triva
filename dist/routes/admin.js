"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const router = express_1.default.Router();
// Display the admin dashboard
router.get('/admin', adminController_1.showDashboard);
// Display the form for adding a new question
router.get('/admin/addQuestion', adminController_1.showAddQuestionForm);
// Handle the submission of a new question
router.post('/admin/addQuestion', adminController_1.addQuestion);
// Display a list of existing questions
router.get('/admin/questionList', adminController_1.showQuestionList);
router.get('/admin/editQuestion/:questionId', adminController_1.editQuestion);
// display the quiz form
router.get('/admin/createQuiz', adminController_1.showQuizForm);
// handle quiz creation
router.post('/admin/createQuiz', adminController_1.createQuiz);
exports.default = router;
