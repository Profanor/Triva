import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/authController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/logout', logoutUser);

export default router;