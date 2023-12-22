import { Request, Response } from 'express';
import User, { UserAttributes } from '../model/User';

interface UserRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export const viewSettings = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;

    // Fetch user settings
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Render the settings page with user data
    res.render('settings', { user });
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSettings = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const { fullname, email, password, gender, phone, address, theme } = req.body;

    // Fetch the user
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Update user settings
    const updatedUser = await user.update({
      fullname,
      email,
      password, // You may want to handle password updates separately
      gender,
      phone,
      address,
      theme,
    } as UserAttributes);

    res.status(200).json({ message: 'User settings updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
