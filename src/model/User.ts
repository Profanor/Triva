import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid'
import sequelize from '../utils/sequelize';

interface UserAttributes {
  id: string;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
  theme: 'light' | 'dark';
}

class User extends Model<UserAttributes> {
  public id!: string;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public gender!: string;
  public phone!: string;
  public address!: string;
  public theme!: 'light' | 'dark';
}

 User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
      unique: true
    },
    fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
    phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
    address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  theme: {
    type: DataTypes.ENUM('light', 'dark'),
    allowNull: false,
    defaultValue: 'light', //default theme
  },
},
{
  sequelize,
  modelName: 'User',
} 
);

export default User;
export { UserAttributes };