import Article, { IArticle } from '../models/articleModel';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';

const getAllArticles = async (): Promise<IArticle[]> => {
    return Article.find().populate('author', 'username');
};



const getArticleById = async (id: string): Promise<IArticle | null> => {
    return Article.findById(id).populate('author', 'username');
};

const createArticle = async (title: string, content: string, authorId: string): Promise<IArticle> => {
    return Article.create({
        title,
        content,
        author: authorId,
    });
};

const updateArticle = async (id: string, title: string, content: string): Promise<IArticle | null> => {
    const article = await Article.findById(id);
    if (!article) {
        return null;
    }

    article.title = title;
    article.content = content;
    await article.save();

    return article;
};

const deleteArticle = async (id: string): Promise<IArticle | null> => {
    const article = await Article.findById(id);
    if (!article) {
        return null;
    }

    await article.deleteOne();
    return article;
};

export default {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};
