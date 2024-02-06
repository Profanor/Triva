import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../utils/sequelize';
import Question from './Question';

class Quiz extends Model {
  public timeLimit!: number;
  public difficulty!: string;
}

Quiz.init(
  {
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Quiz',
  }
);
Quiz.hasMany(Question, { foreignKey: 'quizId' });
export default Quiz;
