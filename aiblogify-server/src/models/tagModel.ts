import { Schema, model, Document } from 'mongoose';

export interface ITag extends Document {
    name: string;
    slug: string;
}

const tagSchema = new Schema<ITag>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
});

const Tag = model<ITag>('Tag', tagSchema);

export default Tag;
