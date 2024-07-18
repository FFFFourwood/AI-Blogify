import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IAudit extends Document {
    action: string;
    details: any;
    user: ObjectId;
    timestamp: Date;
}

const auditSchema = new Schema<IAudit>({
    action: { type: String, required: true },
    details: { type: Schema.Types.Mixed, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
});

const Audit = model<IAudit>('Audit', auditSchema);

export default Audit;
