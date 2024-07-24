import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IArticleTag extends Document {
    articleId: ObjectId;
    tagId: ObjectId;
}

const articleTagSchema = new Schema<IArticleTag>({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag' }
});

const ArticleTag = model<IArticleTag>('ArticleTag', articleTagSchema);

export default ArticleTag;
