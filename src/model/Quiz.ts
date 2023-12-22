import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import Question from './Question';

interface QuizAttributes {
  id: number;
  timeLimit: string;
  difficulty: string;
}

class Quiz extends Model<QuizAttributes> {
  public id!: number;
  public timeLimit!: string;
  public difficulty!: string;

  // @ts-ignore
  // public setQuestions: (questions: Question[]) => Promise<Quiz[]>;
}

Quiz.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
      timeLimit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
}, {
    sequelize,
    modelName: 'Quiz',
});

// Establish an association with the Question model
Quiz.belongsToMany(Question, { through: 'QuizQuestion' });
Question.belongsToMany(Quiz, { through: 'QuizQuestion' });

export default Quiz;