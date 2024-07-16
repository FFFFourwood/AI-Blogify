import express from 'express';
import cors from 'cors';
import connectDB from './utils/database';
import errorHandler from './middlewares/errorHandler';
import articleRoutes from './routes/articleRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import openaiRoutes from './routes/openaiRoutes';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
connectDB();

// 路由
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/openai', openaiRoutes);

// 错误处理
app.use(errorHandler);

export default app;
