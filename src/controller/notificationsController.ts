import { Request, Response } from 'express';
import User from '../model/User';
import * as notifier from 'node-notifier';

// Helper function to send notifications
const sendNotification = async (email: string, title: string, message: string): Promise<void> => {
    await new Promise<void>((resolve) => {
        notifier.notify(
        {
            title,
            message,
            wait: true,
    },
    (err, response) => {
        if (err) {
            console.error('Notification error:', err);
        } else {
            console.log('Notification response:', response);  
        }
        resolve();
            });
        });
    };

export const sendNewQuizNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch the list of users
    const users = await User.findAll();

    // Send notifications to each user
    for ( const user of users ) {
      await sendNotification(user.email, 'New Quiz Available', 'Check out the latest quiz on Triva!'); 
    }

    res.status(200).json({ success: true, message: 'New quiz notifications sent successfully' });
  } catch (error) {
    console.error('Error sending new quiz notifications:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const sendQuizReminderNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch the list of users who need reminders (based on your logic)
    const users = await User.findAll();

    // Send reminders to each user
    for ( const user of users ){
        await sendNotification(user.email, 'Quiz Reminder', 'Don\'t forget to take the quiz!');
    }

    res.status(200).json({ success: true, message: 'Quiz reminder notifications sent successfully' });
  } catch (error) {
    console.error('Error sending quiz reminder notifications:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const sendAchievementNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch the list of users who achieved something (based on your logic)
    const users = await User.findAll();

    // Send achievement notifications to each user
    for ( const user of users ) {
      await sendNotification(user.email, 'Achievement Unlocked', 'Congratulations on your achievement!');
    }

    res.status(200).json({ success: true, message: 'Achievement notifications sent successfully' });
  } catch (error) {
    console.error('Error sending achievement notifications:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};