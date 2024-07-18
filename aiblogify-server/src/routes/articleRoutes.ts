import express from 'express';
import { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle } from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllArticles);                        // 获取所有文章
router.get('/:id', getArticle);                         // 获取单个文章
router.post('/', authMiddleware, createArticle);        // 创建新文章
router.put('/:id', authMiddleware, updateArticle);      // 更新文章
router.delete('/:id', authMiddleware, deleteArticle);   // 删除文章

export default router;
