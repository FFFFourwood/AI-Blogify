import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IArticleCategory extends Document {
    articleId: ObjectId;
    categoryId: ObjectId;
}

const articleCategorySchema = new Schema<IArticleCategory>({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const ArticleCategory = model<IArticleCategory>('ArticleCategory', articleCategorySchema);

export default ArticleCategory;
