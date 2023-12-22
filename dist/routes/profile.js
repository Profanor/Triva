"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../model/User"));
const router = express_1.default.Router();
const getUser = async (email) => {
    try {
        const user = await User_1.default.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        console.error('error retrieving user from the database:', error);
        throw error;
    }
};
router.get('/profile', async (req, res) => {
    try {
        const { email } = req.query;
        console.log('Email:', email);
        if (!email || typeof email !== 'string') {
            return res.status(400).json('Email parameter required');
        }
        const user = await getUser(email);
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
exports.default = router;
