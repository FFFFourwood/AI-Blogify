import { Router } from 'express';
import { authorize } from '../middlewares/authMiddleware';

const router = Router();

router.get('/dashboard', authorize(['admin:read']), (req, res) => {
    res.send('Admin Dashboard');
});

router.post('/create-user', authorize(['admin:create']), (req, res) => {
    // 创建用户的逻辑
});

export default router;
