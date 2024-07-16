import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IAIRecord extends Document {
    prompt: string;
    result: string;
    user: ObjectId;
    createdAt: Date;
}

const aiRecordSchema = new Schema<IAIRecord>({
    prompt: { type: String, required: true },
    result: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const AIRecord = model<IAIRecord>('AIRecord', aiRecordSchema);

export default AIRecord;
