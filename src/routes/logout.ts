import express, { Request, Response} from 'express';
import authController from '../controller/authController';
const router = express.Router()

router.all('/logout', (req: Request, res: Response) => {
    authController.logoutUser(req, res);
        res.redirect('/login');
    });

export default router;