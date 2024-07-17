import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import passport from '../middlewares/passport';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err:any, user:any, info:any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
};
