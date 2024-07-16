import express from 'express';
import { bindWallet } from '../controllers/walletController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/bind', authMiddleware, bindWallet);

export default router;
