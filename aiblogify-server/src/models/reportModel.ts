import { Schema, model, Document } from 'mongoose';

export interface IReport extends Document {
    reportType: string;
    data: any;
    generatedAt: Date;
}

const reportSchema = new Schema<IReport>({
    reportType: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    generatedAt: { type: Date, default: Date.now },
});

const Report = model<IReport>('Report', reportSchema);

export default Report;
