"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAchievementNotification = exports.sendQuizReminderNotification = exports.sendNewQuizNotification = void 0;
const User_1 = __importDefault(require("../model/User"));
const notifier = __importStar(require("node-notifier"));
// Helper function to send notifications
const sendNotification = async (email, title, message) => {
    await new Promise((resolve) => {
        notifier.notify({
            title,
            message,
            wait: true,
        }, (err, response) => {
            if (err) {
                console.error('Notification error:', err);
            }
            else {
                console.log('Notification response:', response);
            }
            resolve();
        });
    });
};
const sendNewQuizNotification = async (req, res) => {
    try {
        // Fetch the list of users
        const users = await User_1.default.findAll();
        // Send notifications to each user
        for (const user of users) {
            await sendNotification(user.email, 'New Quiz Available', 'Check out the latest quiz on Triva!');
        }
        res.status(200).json({ success: true, message: 'New quiz notifications sent successfully' });
    }
    catch (error) {
        console.error('Error sending new quiz notifications:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.sendNewQuizNotification = sendNewQuizNotification;
const sendQuizReminderNotification = async (req, res) => {
    try {
        // Fetch the list of users who need reminders (based on your logic)
        const users = await User_1.default.findAll();
        // Send reminders to each user
        for (const user of users) {
            await sendNotification(user.email, 'Quiz Reminder', 'Don\'t forget to take the quiz!');
        }
        res.status(200).json({ success: true, message: 'Quiz reminder notifications sent successfully' });
    }
    catch (error) {
        console.error('Error sending quiz reminder notifications:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.sendQuizReminderNotification = sendQuizReminderNotification;
const sendAchievementNotification = async (req, res) => {
    try {
        // Fetch the list of users who achieved something (based on your logic)
        const users = await User_1.default.findAll();
        // Send achievement notifications to each user
        for (const user of users) {
            await sendNotification(user.email, 'Achievement Unlocked', 'Congratulations on your achievement!');
        }
        res.status(200).json({ success: true, message: 'Achievement notifications sent successfully' });
    }
    catch (error) {
        console.error('Error sending achievement notifications:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.sendAchievementNotification = sendAchievementNotification;
