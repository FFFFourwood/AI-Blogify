import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    oauthProvider?: string;
    oauthId?: string;
    oauthToken?: string;
    walletAddress?: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    oauthProvider: { type: String },
    oauthId: { type: String },
    oauthToken: { type: String },
    walletAddress: { type: String, unique: true },
}, {
    timestamps: true
});

const User = model<IUser>('User', userSchema);

export default User;
