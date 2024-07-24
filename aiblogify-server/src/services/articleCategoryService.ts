import { ObjectId } from 'mongoose';
import Article from '../models/articleModel';
import Category from '../models/categoryModel';
import ArticleCategory from '../models/articleCategoryModel';

export const addCategoriesToArticle = async (articleId: ObjectId, categoryIds: ObjectId[]) => {
    const article = await Article.findById(articleId);
    if (!article) {
        throw new Error('Article not found');
    }

    for (const categoryId of categoryIds) {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error(`Category with ID ${categoryId} not found`);
        }

        const existingArticleCategory = await ArticleCategory.findOne({ articleId, categoryId });
        if (!existingArticleCategory) {
            const articleCategory = new ArticleCategory({ articleId, categoryId });
            await articleCategory.save();
        }
    }
};

export const removeCategoriesFromArticle = async (articleId: ObjectId, categoryIds: ObjectId[]) => {
    for (const categoryId of categoryIds) {
        const result = await ArticleCategory.deleteOne({ articleId, categoryId });
        if (result.deletedCount === 0) {
            throw new Error(`ArticleCategory with category ID ${categoryId} not found`);
        }
    }
    return { message: 'Categories removed successfully' };
};

export const updateCategoriesForArticle = async (articleId: ObjectId, newCategoryIds: ObjectId[]) => {
    await ArticleCategory.deleteMany({ articleId });
    return await addCategoriesToArticle(articleId, newCategoryIds);
};

export const getCategoriesForArticle = async (articleId: ObjectId) => {
    const articleCategories = await ArticleCategory.find({ articleId }).populate('categoryId');
    const categories = articleCategories.map(ac => ac.categoryId);
    return categories;
};