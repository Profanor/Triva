import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';

class QuizHistory extends Model {
  public userId!: number;
  public quizId!: string;
  public status!: string;
  public answers!: JSON;
}

QuizHistory.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answers: {
        type: DataTypes.JSONB, // Store user answers as a JSON object or array
    },
}, {
    sequelize,
    modelName: 'quizHistory',
});

export default QuizHistory;