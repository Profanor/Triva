import express from 'express';
import { logoutUser } from '../controller/playerController';

const router = express.Router()

router.all('/logout',logoutUser);

export default router;