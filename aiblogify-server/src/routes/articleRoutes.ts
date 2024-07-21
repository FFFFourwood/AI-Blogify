import express from 'express';
import { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle, getArticlesByCategory, getArticlesByTag } from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllArticles);
router.get('/category/:categoryId', getArticlesByCategory);
router.get('/tag/:tagId', getArticlesByTag);
router.get('/:id', getArticle);
router.post('/', authMiddleware, createArticle);
router.put('/:id', authMiddleware, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);


export default router;
