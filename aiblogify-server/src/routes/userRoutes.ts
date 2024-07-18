import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);         // 获取所有用户
router.get('/:id', authMiddleware, getUser);          // 获取单个用户
router.put('/:id', authMiddleware, updateUser);       // 更新用户资料
router.delete('/:id', authMiddleware, deleteUser);    // 删除用户

export default router;
