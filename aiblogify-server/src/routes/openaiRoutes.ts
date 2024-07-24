import express from 'express';
import OpenAIService from '../services/openaiService';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// router.post('/', authMiddleware, fn());
// });

export default router;