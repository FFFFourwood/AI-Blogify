import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    content: string;
    author: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const articleSchema = new Schema<IArticle>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Article = model<IArticle>('Article', articleSchema);

export default Article;
