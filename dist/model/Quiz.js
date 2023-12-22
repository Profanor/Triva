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
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    timeLimit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Quiz',
});
// Establish an association with the Question model
Quiz.belongsToMany(Question_1.default, { through: 'QuizQuestion' });
Question_1.default.belongsToMany(Quiz, { through: 'QuizQuestion' });
exports.default = Quiz;
