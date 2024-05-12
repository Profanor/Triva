import jwt from 'jsonwebtoken';
import User from "../model/User";
import dotenv from 'dotenv';
dotenv.config();

export const getUser = async (email: string): Promise<User | null> => {
  try {
      const user = await User.findOne({ where: { email } });
      return user;
  } catch(error) {
      console.error('error retrieving user from the database:', error);
      throw error;
  }
};

// export const getUserByToken = async (token: string): Promise<User | null> => {
//     try {
//       // Verify and decode the JWT token
//       const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY || ''); // Verify the token using your secret key
  
//       // Extract the user ID from the decoded token
//       const userId = decodedToken.userId;

//       console.log('DecodedToken is:', decodedToken);
      
//       // Fetch the user by user ID
//       const user = await User.findByPk(userId);
  
//       return user;
//     } catch(error) {
//       console.error('Error retrieving user from the database:', error);
//       throw error;
//     }
//   };