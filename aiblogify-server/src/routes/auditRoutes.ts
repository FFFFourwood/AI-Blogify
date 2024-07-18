import express from 'express';
import { logAction, getAuditLogs } from '../controllers/auditController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, logAction);
router.get('/', authMiddleware, getAuditLogs);

export default router;
