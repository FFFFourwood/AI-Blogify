import { Schema, model, Document } from 'mongoose';

export interface IImage extends Document {
    url: string;
    article: Schema.Types.ObjectId;
    createdAt: Date;
    title: string;
    views: number;
    likes: number;
}

const imageSchema = new Schema<IImage>({
    url: { type: String, required: true },
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    createdAt: { type: Date, default: Date.now },
    title: { type: String, default: '' },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
});

const Image = model<IImage>('Image', imageSchema);

export default Image;
