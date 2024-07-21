import Article, { IArticle } from '../models/articleModel';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { extractImageUrls } from '../utils/utils';
import Image from '../models/imageModel';

const getAllArticles = async (page: number, limit: number): Promise<PaginateResult<IArticle>> => {
    const options: PaginateOptions = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: 'author',
    };


    return Article.paginate({}, options);
};

const getArticlesByCategory = async (categoryId: string, page: number, limit: number): Promise<PaginateResult<IArticle>> => {
    const options: PaginateOptions = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: 'author',
    };

    return Article.paginate({ categories: categoryId }, options);
};

const getArticlesByTag = async (tagId: string, page: number, limit: number): Promise<PaginateResult<IArticle>> => {
    const options: PaginateOptions = {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: 'author',
    };

    return Article.paginate({ tags: tagId }, options);
};

const getArticleById = async (id: string): Promise<IArticle | null> => {
    return Article.findById(id).populate('author', 'username');
};

const createArticle = async (title: string, content: string, authorId: string): Promise<IArticle> => {
    const newArticle = await Article.create({
        title,
        content,
        author: authorId,
    });

    const imageUrls = extractImageUrls(content);
    const imageDocuments = imageUrls.map(url => ({ url, article: newArticle._id }));
    await Image.insertMany(imageDocuments);

    return newArticle;
};

const updateArticle = async (id: string, title: string, content: string): Promise<IArticle | null> => {
    const article = await Article.findById(id);
    if (!article) {
        return null;
    }

    article.title = title;
    article.content = content;
    await article.save();

    // 更新图片关联
    await Image.deleteMany({ article: id });
    const imageUrls = extractImageUrls(content);
    const imageDocuments = imageUrls.map(url => ({ url, article: article._id }));
    await Image.insertMany(imageDocuments);

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
    getArticlesByCategory,
    getArticlesByTag,
};
