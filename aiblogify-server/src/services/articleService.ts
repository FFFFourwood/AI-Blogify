import Article, { IArticle } from '../models/articleModel';
import { FilterQuery, PaginateOptions, PaginateResult } from 'mongoose';
import { extractImageUrls } from '../utils/utils';
import Image from '../models/imageModel';
import { ObjectId } from 'bson';

const aggregateArticles = async (filter: FilterQuery<IArticle>, page: number, limit: number): Promise<any> => {
    const articles = await Article.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $lookup: {
                from: 'images',
                localField: '_id',
                foreignField: 'article',
                as: 'images'
            }
        },
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'author',
        //         foreignField: '_id',
        //         as: 'author'
        //     }
        // },
        // { $unwind: '$author' }, // Unwind author array
        {
            $project: {
                title: 1,
                content: 1,
                // author: { username: 1, email: 1 }, // Include only specific fields from author
                createdAt: 1,
                updatedAt: 1,
                slug: 1,
                status: 1,
                commentsCounts: 1,
                views: 1,
                likes: 1,
                type: 1,
                categories: 1,
                tags: 1,
                description: 1,
                coverImg: 1,
                images: { $map: { input: "$images", as: "image", in: "$$image.url" } }
            }
        }
    ]).exec();

    const total = await Article.countDocuments(filter);

    return {
        docs: articles,
        totalDocs: total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
        pagingCounter: (page - 1) * limit + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < Math.ceil(total / limit),
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(total / limit) ? page + 1 : null
    };
};

const getAllArticles = async (page: number, limit: number): Promise<any> => {
    return aggregateArticles({}, page, limit);
};
const getArticlesByCategory = async (categoryId: string, page: number, limit: number): Promise<any> => {
    return aggregateArticles({ categories: new ObjectId(categoryId) }, page, limit);
};

const getArticlesByTag = async (tagId: string, page: number, limit: number): Promise<any> => {
    return aggregateArticles({ tags: new ObjectId(tagId) }, page, limit);
};

const getArticleById = async (id: string): Promise<any | null> => {
    const articles = await aggregateArticles({ _id: new ObjectId(id) }, 1, 1);
    return articles.docs.length ? articles.docs[0] : null;
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
