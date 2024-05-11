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
exports.updateSettings = exports.viewSettings = void 0;
const User_1 = __importDefault(require("../model/User"));
const viewSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        // Fetch user settings
        const user = yield User_1.default.findByPk(userId);
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
});
exports.viewSettings = viewSettings;
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { fullname, email, password, gender, phone, address, theme } = req.body;
        // Fetch the user
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        // Update user settings
        const updatedUser = yield user.update({
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
});
exports.updateSettings = updateSettings;
