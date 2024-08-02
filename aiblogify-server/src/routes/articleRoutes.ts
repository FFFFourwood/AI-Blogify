import express from 'express';
import { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle, getArticlesByCategory, getArticlesByTag } from '../controllers/articleController';
import { getAllCategories, updateCategory, deleteCategory, getCategory, createCategories } from '../controllers/categoryController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/article/', getAllArticles); //get all articles
router.get('/article/:id', getArticle); //get article by id
router.get('/article/bycategory/:categoryId', getArticlesByCategory); //get articles by category
router.get('/category', getAllCategories); //get all categories
router.put('/category/:categoryId', authMiddleware, updateCategory); //update category
router.delete('/category/:categoryId', authMiddleware, deleteCategory); //delete category
router.get('/category/:categoryId', getCategory); // get category by id
router.post('/category/', authMiddleware, createCategories); //create categories





router.get('/tag/:tagId', getArticlesByTag);    //get articles by tag

router.post('/article/', authMiddleware, createArticle);
router.put('/article/:id', authMiddleware, updateArticle);
router.delete('/article/:id', authMiddleware, deleteArticle);


export default router;
