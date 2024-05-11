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
exports.logoutUser = exports.viewQuizHistory = exports.changePassword = exports.updateUserProfile = exports.profile = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const password_1 = require("../utils/password");
const QuizHistory_1 = __importDefault(require("../model/QuizHistory"));
const secretKey = process.env.JWT_SECRET || 'default_secret';
const tokenExpiration = '1h';
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        console.error('error retrieving user from the database:', error);
        throw error;
    }
});
//register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password, gender, phone, address } = req.body;
        //check if the user with the email already exists
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'User with this email already exists' });
            return;
        }
        //hash the password
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        //create a new user
        const newUser = yield User_1.default.create({
            fullname,
            email,
            password: hashedPassword,
            gender,
            phone,
            address,
        });
        res.redirect('/login');
        // res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.registerUser = registerUser;
//login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //check if the user email exists
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        //check if password is correct
        const isPasswordValid = yield (0, password_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
        // Create and send JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, secretKey, {
            expiresIn: tokenExpiration,
        });
        res.cookie('jwt', token, { httpOnly: true });
        //passwords match, redirect to user profile
        res.redirect(`/profile?email=${user.email}`);
        console.log('logged in successfully');
        // res.status(200).json({ message: 'Login successful', user });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});
exports.loginUser = loginUser;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            res.status(400).json('Email parameter required');
            return;
        }
        const user = yield getUser(email);
        if (!user) {
            res.status(404).json('User not found');
            return;
        }
        res.render('profile', { title: `Hi ${user.fullname}`, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
exports.profile = profile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedUser = yield User_1.default.update({ fullname, gender, phone, address, }, { returning: true, where: { id: userId } });
        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUserProfile = updateUserProfile;
// Define a function for input validation
const validateUserProfileUpdate = (fullname, gender, phone, address) => {
    if (!fullname || !gender || !phone || !address) {
        return { status: 400, message: 'All fields must be provided' };
    }
    return null; // No validation error
};
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        // Validate input data
        if (!oldPassword || !newPassword) {
            res.status(400).json({ error: 'Both old and new passwords are required' });
            return;
        }
        // Fetch the user
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Check if the old password is correct
        const isPasswordValid = yield (0, password_1.comparePassword)(oldPassword, user.password);
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
        const hashedPassword = yield (0, password_1.hashPassword)(newPassword);
        yield user.update({ password: hashedPassword });
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
const viewQuizHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        // Fetch the user's quiz history
        const quizHistory = yield User_1.default.findByPk(userId, { include: [{ model: QuizHistory_1.default }] });
        res.status(200).json({ quizHistory });
    }
    catch (error) {
        console.error('Error fetching quiz history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewQuizHistory = viewQuizHistory;
// Logout user
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.logoutUser = logoutUser;
exports.default = {
    registerUser: exports.registerUser,
    loginUser: exports.loginUser,
    profile: exports.profile,
    updateUserProfile: exports.updateUserProfile,
    viewQuizHistory: exports.viewQuizHistory,
    logoutUser: exports.logoutUser
};
