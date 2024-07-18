import express from 'express';
import { generateText } from '../controllers/openaiController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/generate', authMiddleware, generateText);

export default router;
