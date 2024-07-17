import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModel'; 
import bcrypt from 'bcryptjs'; 


passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username: string, password: string, done: Function) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Invalid credentials' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Invalid credentials' });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: any, done: Function) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id: string, done: Function) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Pass the user object to 'req.user'
  } catch (error) {
    done(error);
  }
});

export default passport;
