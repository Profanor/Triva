"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Question_1 = __importDefault(require("../model/Question"));
// Function to fetch quiz questions based on difficulty
const generateQuizQuestions = async (quiz) => {
    try {
        const questions = await Question_1.default.findAll({
            where: {
                difficulty: quiz.difficulty,
            },
            order: sequelize_1.Sequelize.literal('RANDOM()'), //randomize the order
        });
        console.log('Difficulty:', quiz.difficulty);
        return questions;
    }
    catch (error) {
        console.error(`Error generating quiz questions for difficulty ${quiz.difficulty}:`, error);
        return [];
    }
};
exports.default = generateQuizQuestions;
