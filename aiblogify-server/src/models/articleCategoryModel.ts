import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IAtticleCategory extends Document {
    articleId: ObjectId;
    categoryId: ObjectId;
}

const articleCategorySchema = new Schema<IAtticleCategory>({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const AtticleCategory = model<IAtticleCategory>('AtticleCategory', articleCategorySchema);

export default AtticleCategory;
