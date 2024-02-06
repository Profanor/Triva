import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import Quiz from './Quiz';

class Question extends Model {
  public text!: string;
  public options!: string;
  public category!: string;
  public correctAnswer!: string;
  public difficulty!: string;

  static associate (): void {
    Question.belongsTo(Quiz, { foreignKey: 'quizId' });
  }
}

Question.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    options: {
        type: DataTypes.JSONB,
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
}, {
    sequelize,
    modelName: 'Question',
});

export default Question;