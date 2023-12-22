"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Question_1 = __importDefault(require("../model/Question"));
// Function to fetch quiz questions based on quiz details
const generateQuizQuestions = async (quiz) => {
    try {
        const questions = await Question_1.default.findAll({
            where: {
                quizId: quiz.id,
            },
            order: sequelize_1.Sequelize.literal('RAND()'), //randomize the order
        });
        return questions;
    }
    catch (error) {
        console.error('Error generating quiz questions:', error);
        throw error;
    }
};
exports.default = generateQuizQuestions;
