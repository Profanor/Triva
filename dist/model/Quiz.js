"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../utils/sequelize"));
const Question_1 = __importDefault(require("./Question"));
class Quiz extends sequelize_1.Model {
}
Quiz.init({
    timeLimit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Quiz',
});
Quiz.hasMany(Question_1.default, { foreignKey: 'quizId' });
exports.default = Quiz;
