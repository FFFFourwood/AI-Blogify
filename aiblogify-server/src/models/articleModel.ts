import { Schema, model, Document, ObjectId } from 'mongoose';
import { ArticleStatus, ArticleCardType } from '../utils/enum';

export interface IArticle extends Document {
    title: string;
    content: string;
    author: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    status: ArticleStatus;
    commentsCounts: number;
    views: number;
    likes: number;
    type: ArticleCardType,
    categories: Schema.Types.ObjectId[];
    tags: Schema.Types.ObjectId[];
}

const articleSchema = new Schema<IArticle>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    slug: { type: String, required: true },
    status: { type: Number, default: ArticleStatus.DRAFT },
    commentsCounts: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    type: { type: Number, default: ArticleCardType.DEFAULT },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
}, {
    timestamps: true
});

const Article = model<IArticle>('Article', articleSchema);

export default Article;
