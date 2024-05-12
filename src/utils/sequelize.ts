import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_FILE_PATH || './database.sqlite',
    logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;