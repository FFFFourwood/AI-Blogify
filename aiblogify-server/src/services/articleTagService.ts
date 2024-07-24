import { ObjectId } from 'mongoose';
import Article from '../models/articleModel';
import Tag from '../models/tagModel';
import ArticleTag from '../models/articleTag';

export const addTagsToArticle = async (articleId: string, tagIds: string[]) => {
    const article = await Article.findById(articleId);
    if (!article) {
        throw new Error('Article not found');
    }

    for (const tagId of tagIds) {
        const tag = await Tag.findById(tagId);
        if (!tag) {
            throw new Error(`Tag with ID ${tagId} not found`);
        }

        const existingArticleTag = await ArticleTag.findOne({ articleId, tagId });
        if (!existingArticleTag) {
            const articleTag = new ArticleTag({ articleId, tagId });
            await articleTag.save();
        }
    }
};

export const removeTagsFromArticle = async (articleId: ObjectId, tagIds: ObjectId[]) => {
    for (const tagId of tagIds) {
        const result = await ArticleTag.deleteOne({ articleId, tagId });
        if (result.deletedCount === 0) {
            throw new Error(`ArticleTag with tag ID ${tagId} not found`);
        }
    }
    return { message: 'Tags removed successfully' };
};

export const updateTagsForArticle = async (articleId: string, newTagIds: string[]) => {
    await ArticleTag.deleteMany({ articleId });
    return await addTagsToArticle(articleId, newTagIds);
};

export const getTagsForArticle = async (articleId: ObjectId) => {
    const articleTags = await ArticleTag.find({ articleId }).populate('tagId');
    const tags = articleTags.map(ac => ac.tagId);
    return tags;
};