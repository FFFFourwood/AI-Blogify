import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
