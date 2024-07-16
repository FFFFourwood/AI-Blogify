/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import User, { IUser } from '../models/userModel';

// 序列化用户
passport.serializeUser((user, done) => {
    done(null, (user as IUser).id);
});

// 反序列化用户
passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: IUser) => {
        done(err, user as IUser);
    });
});
