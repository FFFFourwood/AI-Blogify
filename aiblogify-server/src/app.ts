import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectDB from './utils/database';
import errorHandler from './middlewares/errorHandler';
import articleRoutes from './routes/articleRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import openaiRoutes from './routes/openAIRoutes';
import reportRoutes from './routes/reportRoutes';
import auditRoutes from './routes/auditRoutes';
import cookieParser from 'cookie-parser';
// import './config/passport';
import loadEnvironmentVariables from './config/loadEnv';
import './cron/resetDailyUsage'
loadEnvironmentVariables();
const app = express();

// middlewares
app.use(cors({
    origin: 'http://localhost:3000', // 更新为你的前端URL
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: false }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !!process.env.COOKIE_SECURE }
}));
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
connectDB();

// router
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/audits', auditRoutes);

// error handler
app.use(errorHandler);

export default app;
