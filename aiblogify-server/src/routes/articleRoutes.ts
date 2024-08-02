import express from 'express';
import { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle, getArticlesByCategory, getArticlesByTag } from '../controllers/articleController';
import { getAllCategories } from '../controllers/categoryController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/article/', getAllArticles); //get all articles
router.get('/article/:id', getArticle); //get article by id
router.get('/category', getAllCategories); //get all categories



router.get('/category/:categoryId', getArticlesByCategory); //get articles by category
router.get('/tag/:tagId', getArticlesByTag);    //get articles by tag

router.post('/article/', authMiddleware, createArticle);
router.put('/article/:id', authMiddleware, updateArticle);
router.delete('/article/:id', authMiddleware, deleteArticle);


export default router;
