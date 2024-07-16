import { Request, Response } from 'express';
import articleService from '../services/articleService';

// 获取所有文章
export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await articleService.getAllArticles();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

// 获取单个文章
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
