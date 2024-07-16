import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github';
import User, { IUser } from '../models/userModel';

// Google OAuth 策略
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ oauthProvider: 'google', oauthId: profile.id });

        if (!user) {
            const email = profile.emails && profile.emails[0]?.value;
            user = new User({
                username: profile.displayName,
                email: email ? email : '',
                oauthProvider: 'google',
                oauthId: profile.id,
                oauthToken: token,
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Facebook OAuth 策略
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID!,
    clientSecret: process.env.FACEBOOK_APP_SECRET!,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email'],
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ oauthProvider: 'facebook', oauthId: profile.id });

        if (!user) {
            const email = profile.emails && profile.emails[0]?.value;
            user = new User({
                username: profile.displayName,
                email: email ? email : '',
                oauthProvider: 'facebook',
                oauthId: profile.id,
                oauthToken: token,
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// GitHub OAuth 策略
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: '/auth/github/callback',
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ oauthProvider: 'github', oauthId: profile.id });

        if (!user) {
            const email = profile.emails && profile.emails[0]?.value;
            user = new User({
                username: profile.displayName || profile.username,
                email: email ? email : '',
                oauthProvider: 'github',
                oauthId: profile.id,
                oauthToken: token,
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

export default passport;
