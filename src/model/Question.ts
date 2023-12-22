import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import Quiz from './Quiz';

class Question extends Model {
  public text!: string;
  public options!: string;
  public category!: string;
  public correctAnswer!: string;
  public difficulty!: string;
  public QuizId!: number;
}

Question.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: DataTypes.JSONB, // Store answer choices as a JSON object or array
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      QuizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Quiz,
            key: 'id',
        },
    },  
}, {
    sequelize,
    modelName: 'Question',
});

// Establish an association with the Quiz model
Question.belongsToMany(Quiz, { through: 'QuizQuestion' });
Quiz.belongsToMany(Question, { through: 'QuizQuestion' });

export default Question;