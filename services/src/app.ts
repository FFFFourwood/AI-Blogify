import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectDB from './utils/database';
import errorHandler from './middlewares/errorHandler';
import articleRoutes from './routes/articleRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import openaiRoutes from './routes/openaiRoutes';
import reportRoutes from './routes/reportRoutes';
import auditRoutes from './routes/auditRoutes';
import './config/passport'; // 引入 Passport 配置

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// 连接数据库
connectDB();

// 路由
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/audits', auditRoutes);

// 错误处理
app.use(errorHandler);

export default app;
