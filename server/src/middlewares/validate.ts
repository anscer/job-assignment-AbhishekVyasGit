import { Request, Response, NextFunction } from 'express';

export const validateState = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, status, createdBy } = req.body;
  if (!name || !description || !status || !createdBy) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};
