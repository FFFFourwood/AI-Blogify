import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { generateBlogBasicInfo } from '../controllers/openAIController';

const router = express.Router();

router.get('/generateBlogInfo/:id', authMiddleware, generateBlogBasicInfo);

export default router;