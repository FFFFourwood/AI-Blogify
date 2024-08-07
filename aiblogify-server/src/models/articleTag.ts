import { Schema, model, Document, ObjectId } from 'mongoose';


export interface IAtricleTag extends Document {
    articleId: ObjectId;
    tagId: ObjectId;
}

const articleTagSchema = new Schema<IAtricleTag>({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag' }
});
const ArticleTag = model<IAtricleTag>('ArticleTag', articleTagSchema);
export default ArticleTag;