import { Request, Response } from 'express';
import articleService from '../services/articleService';
import logger from '../utils/logger';
// get all articles
export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 10 } = req.query;
    logger.info(`getAllArticles:Getting all articles`);
    try {
        const articles = await articleService.getAllArticles(Number(page), Number(limit));
        logger.info(`getAllArticles:Articles fetched successfully`);
        res.status(200).json(articles);
    } catch (error) {
        logger.error(`getAllArticles:Error fetching articles`);
        res.status(400).json({ message: 'Error fetching articles', error });
    }
};

// get articles by category
export const getArticlesByCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    logger.info(`getArticlesByCategory:Getting articles by category`);
    try {
        const articles = await articleService.getArticlesByCategory(categoryId, Number(page), Number(limit));
        logger.info(`getArticlesByCategory:Articles fetched successfully`);
        res.status(200).json(articles);
    } catch (error) {
        logger.error(`getArticlesByCategory:Error fetching articles by category`);
        res.status(400).json({ message: 'Error fetching articles by category', error });
    }
};

//get articles by tag
export const getArticlesByTag = async (req: Request, res: Response): Promise<void> => {
    const { tagId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    logger.info(`getArticlesByTag:Getting articles by tag`);

    try {
        const articles = await articleService.getArticlesByTag(tagId, Number(page), Number(limit));
        logger.info(`getArticlesByTag:Articles fetched successfully`);
        res.status(200).json(articles);
    } catch (error) {
        logger.error(`getArticlesByTag:Error fetching articles by tag`);
        res.status(400).json({ message: 'Error fetching articles by tag', error });
    }
};

// get Article by id
export const getArticle = async (req: Request, res: Response) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error });
    }
};

// 创建新文章
export const createArticle = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const article = await articleService.createArticle(title, content, req.user.id);
        res.status(201).json({ message: 'Article created', article });
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
};

// 更新文章
export const updateArticle = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    try {
        const article = await articleService.updateArticle(req.params.id, title, content);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

// 删除文章
export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const article = await articleService.deleteArticle(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};
