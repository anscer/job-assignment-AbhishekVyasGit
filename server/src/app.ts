import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from './middlewares/passport';
import userRoutes from './routes/userRoutes';
import stateRoutes from './routes/stateRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET as string,  
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/states', stateRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
