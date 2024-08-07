import { Schema, model, Document, Types } from 'mongoose';
export interface IApiToken extends Document {
    token: string;
    dailyLimit: number;
    totalLimit: number;
    usedToday: number;
    usedTotal: number;
    resetDate: Date;
    name: string;
    apiUrl: string;
    isDefault: boolean;
}

const apiTokenSchema = new Schema<IApiToken>({
    token: { type: String, required: true, unique: true },
    dailyLimit: { type: Number, default: 500000 },
    totalLimit: { type: Number, default: 100000000 },
    usedToday: { type: Number, default: 0 },
    usedTotal: { type: Number, default: 0 },
    resetDate: { type: Date, default: Date.now },
    name: { type: String, required: true },
    apiUrl: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

export const ApiToken = model<IApiToken>('ApiToken', apiTokenSchema);


export interface IUsageLog extends Document {
    tokenRefId: Types.ObjectId;
    date: Date;
    usage: number;
    token: string;
}

const usageLogSchema = new Schema<IUsageLog>({
    tokenRefId: { type: Schema.Types.ObjectId, ref: 'ApiToken', required: true },
    date: { type: Date, required: true, default: Date.now },
    usage: { type: Number, required: true },
    token: { type: String, required: true },
});


export const UsageLog = model<IUsageLog>('UsageLog', usageLogSchema);