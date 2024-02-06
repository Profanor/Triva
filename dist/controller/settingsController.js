"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.viewSettings = void 0;
const User_1 = __importDefault(require("../model/User"));
const viewSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetch user settings
        const user = await User_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Render the settings page with user data
        res.render('settings', { user });
    }
    catch (error) {
        console.error('Error fetching user settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.viewSettings = viewSettings;
const updateSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullname, email, password, gender, phone, address, theme } = req.body;
        // Fetch the user
        const user = await User_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Update user settings
        const updatedUser = await user.update({
            fullname,
            email,
            password,
            gender,
            phone,
            address,
            theme,
        });
        res.status(200).json({ message: 'User settings updated successfully', user: updatedUser });
    }
    catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateSettings = updateSettings;
