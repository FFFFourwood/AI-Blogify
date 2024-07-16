import express from 'express';
import { generateReport, getReports } from '../controllers/reportController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, generateReport);
router.get('/', authMiddleware, getReports);

export default router;
