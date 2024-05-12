"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.profile = exports.loginUser = exports.registerUser = void 0;
const password_1 = require("../utils/password");
const getUser_1 = require("../utils/getUser");
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Generate a random secret key of sufficient length
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex'); // Generate a 256-bit (32-byte) random string
};
const key = process.env.SECRET_KEY || generateSecretKey();
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password, gender, phone, address } = req.body;
        // Perform input validation checks
        if (!fullname || !email || !password || !gender || !phone || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        //check if the user with the email already exists
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        //Hash the password
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        //Create a new user
        const newUser = yield User_1.default.create({
            fullname,
            email,
            password: hashedPassword,
            gender,
            phone,
            address,
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email: newUser.email }, key, { expiresIn: '1d' });
        console.log({ message: 'User registered successfully', user: newUser, token });
        // Redirect to login page after successful registration
        res.redirect('/login');
    }
    catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Perform input validation checks
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Check if the user email exists
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        //check if password is correct
        const isPasswordValid = yield (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        // Passwords match, generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, key, { expiresIn: '1d' });
        // Redirect the user to their own profile page with the JWT token embedded
        res.redirect(`/profile?token=${token}`);
    }
    catch (error) {
        console.error('Error during login:', error);
        res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});
exports.loginUser = loginUser;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token || typeof token !== 'string') {
            return res.status(400).json('Token parameter required');
        }
        // Verify and decode the JWT token
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '');
        // Extract the user ID from the decoded token
        const userId = decodedToken.userId;
        const user = yield (0, getUser_1.getUserByToken)(userId);
        if (!user) {
            return res.status(404).json('User not found');
        }
        res.render('profile', { title: `Hi ${user.fullname}`, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
exports.profile = profile;
// export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
//   try {
//       const userId = req.user.id;
//       const { fullname, gender, phone, address } = req.body;
//     // Validate input data
//     const validationError = validateUserProfileUpdate(fullname, gender, phone, address);
//     if (validationError) {
//       res.status(validationError.status).json({ error: validationError.message });
//       return;
//   }
//       // Update the user profile
//       const updatedUser = await User.update(
//         { fullname, gender, phone, address,}, 
//         { returning: true, where: { id: userId } }
//         );
//       res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
//   } catch (error) {
//       console.error('Error updating user profile:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
// // Define a function for input validation
// const validateUserProfileUpdate = (
//   fullname: string,
//   gender: string,
//   phone: string,
//   address: string
// ): { status: number; message: string } | null => {
//   if (!fullname || !gender || !phone || !address) {
//       return { status: 400, message: 'All fields must be provided' };
//   }
// return null; // No validation error
// };
// export const changePassword = async (req: Request, res: Response): Promise<void> => {
//   try {
//       const userId = req.user.id; 
//       const { oldPassword, newPassword } = req.body;
//     // Validate input data
//     if (!oldPassword || !newPassword) {
//       res.status(400).json({ error: 'Both old and new passwords are required' });
//       return;
//   }
//       // Fetch the user
//       const user = await User.findByPk(userId);
//       if (!user) {
//           res.status(404).json({ error: 'User not found' });
//           return;
//       }
//       // Check if the old password is correct
//       const isPasswordValid = await comparePassword(oldPassword, user.password);
//       if (!isPasswordValid) {
//           res.status(401).json({ error: 'Invalid old password' });
//           return;
//       }
//       // Validate the new password
//       if (newPassword.length < 8) {
//         res.status(400).json({ error: 'New password must be at least 8 characters long' });
//         return;
//     }
//       // Hash and update the new password
//       const hashedPassword = await hashPassword(newPassword);
//       await user.update({ password: hashedPassword });
//       res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//       console.error('Error changing password:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
// export const viewQuizHistory = async (req: Request, res: Response): Promise<void> => {
//   try {
//       const userId = req.user.id;
//       // Fetch the user's quiz history
//       const quizHistory = await User.findByPk(userId, { include: [{ model: QuizHistory }] });
//       res.status(200).json({ quizHistory });
//   } catch (error) {
//       console.error('Error fetching quiz history:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
// Logout user
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.redirect('/login');
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.logoutUser = logoutUser;
