import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../model/User';
import QuizHistory from "../model/QuizHistory";
import { comparePassword, hashPassword } from '../utils/password';

// Define a user interface to augment the Request type
interface UserRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

const secretKey = process.env.JWT_SECRET || 'default_secret';
const tokenExpiration = '1h';

//register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullname, email, password, gender, phone, address } = req.body;

        //check if the user with the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
         res.status(400).json({ error: 'User with this email already exists' });
         return;
        }

        //hash the password
        const hashedPassword = await hashPassword(password);

        //create a new user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            gender,
            phone,
            address,
        } as UserAttributes);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({error: 'Internal server error' });
    }
};

//login user
export const loginUser = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        //check if the user email exists
        const user = await User.findOne({ where: { email } });
        if(!user) {
         res.status(401).json({ error: 'Invalid email or password' });
         return;
        }

        //check if password is correct
        const isPasswordValid = await comparePassword(password, user.password) ;
        if (!isPasswordValid) {
         res.status(401).json({ error: 'Invalid email or password' });
         return;
        }

        // Create and send JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
            expiresIn: tokenExpiration,
      });
  
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const updateUserProfile = async (req: UserRequest, res: Response): Promise<void> => {
  try {
      const userId = req.user.id;
      const { fullname, gender, phone, address } = req.body;

    // Validate input data
    const validationError = validateUserProfileUpdate(fullname, gender, phone, address);
    if (validationError) {
      res.status(validationError.status).json({ error: validationError.message });
      return;
  }
      // Update the user profile
      const updatedUser = await User.update(
        { fullname, gender, phone, address,}, 
        { returning: true, where: { id: userId } }
        );

      res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// Define a function for input validation
const validateUserProfileUpdate = (
  fullname: string,
  gender: string,
  phone: string,
  address: string
): { status: number; message: string } | null => {
  if (!fullname || !gender || !phone || !address) {
      return { status: 400, message: 'All fields must be provided' };
  }
  return null; // No validation error
};


export const changePassword = async (req: UserRequest, res: Response): Promise<void> => {
  try {
      const userId = req.user.id; 
      const { oldPassword, newPassword } = req.body;

    // Validate input data
    if (!oldPassword || !newPassword) {
      res.status(400).json({ error: 'Both old and new passwords are required' });
      return;
  }

      // Fetch the user
      const user = await User.findByPk(userId);
      if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
      }

      // Check if the old password is correct
      const isPasswordValid = await comparePassword(oldPassword, user.password);
      if (!isPasswordValid) {
          res.status(401).json({ error: 'Invalid old password' });
          return;
      }

      // Validate the new password
      if (newPassword.length < 8) {
        res.status(400).json({ error: 'New password must be at least 8 characters long' });
        return;
    }

      // Hash and update the new password
      const hashedPassword = await hashPassword(newPassword);
      await user.update({ password: hashedPassword });

      res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const viewQuizHistory = async (req: UserRequest, res: Response): Promise<void> => {
  try {
      const userId = req.user.id;

      // Fetch the user's quiz history
      const quizHistory = await User.findByPk(userId, { include: [{ model: QuizHistory }] });
      
      res.status(200).json({ quizHistory });
  } catch (error) {
      console.error('Error fetching quiz history:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };