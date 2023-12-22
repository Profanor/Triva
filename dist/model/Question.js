"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../utils/sequelize"));
const Quiz_1 = __importDefault(require("./Quiz"));
class Question extends sequelize_1.Model {
}
Question.init({
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: sequelize_1.DataTypes.JSONB, // Store answer choices as a JSON object or array
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    correctAnswer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    QuizId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Quiz_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: sequelize_2.default,
    modelName: 'Question',
});
// Establish an association with the Quiz model
Question.belongsToMany(Quiz_1.default, { through: 'QuizQuestion' });
Quiz_1.default.belongsToMany(Question, { through: 'QuizQuestion' });
exports.default = Question;
