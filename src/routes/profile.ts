import express, { Response, Request } from 'express';
import User from '../model/User';
import QuizHistory from '../model/QuizHistory';

const router = express.Router();

const getUser = async (email: string): Promise<User | null> => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch(error) {
        console.error('error retrieving user from the database:', error);
        throw error;
    }
};

router.get('/profile', async (req: Request, res: Response) => {
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

        } catch (error) {
            console.error(error);
            res.status(500).json('internal server error');
        }
});

export default router;