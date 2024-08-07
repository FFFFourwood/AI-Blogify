import express from 'express';
import { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle, getArticlesByCategory, getArticlesByTag } from '../controllers/articleController';
import { getAllCategories, updateCategory, deleteCategory, getCategory, createCategories } from '../controllers/categoryController';
import { getAllTags, updateTag, deleteTag, getTag, createTags } from '../controllers/tagController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

//article routes
router.get('/article/', getAllArticles); //get all articles
router.get('/article/:id', getArticle); //get article by id
// router.post('/article/', authMiddleware, createArticle);
// router.put('/article/:id', authMiddleware, updateArticle);
// router.delete('/article/:id', authMiddleware, deleteArticle);
router.get('/article/bycategory/:categoryId', getArticlesByCategory); //get articles by category
router.get('/article/bytag/:tagId', getArticlesByTag);    //get articles by tag

//category routes
router.get('/category', getAllCategories); //get all categories
router.put('/category/:categoryId', authMiddleware, updateCategory); //update category
router.delete('/category/:categoryId', authMiddleware, deleteCategory); //delete category
router.get('/category/:categoryId', getCategory); // get category by id
router.post('/category/', authMiddleware, createCategories); //create categories

//tag routes
router.get('/tag', getAllTags); //get all tags
router.put('/tag/:tagId', authMiddleware, updateTag); //update tag
router.delete('/tag/:tagId', authMiddleware, deleteTag); //delete tag
router.get('/tag/:tagId', getTag); // get tag by id
router.post('/tag/', authMiddleware, createTags); //create tags

export default router;
