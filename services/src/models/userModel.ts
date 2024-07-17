import mongoose, { Schema, model, Document } from 'mongoose';
import { IRole } from './roleModel';
import { UserFrom } from '../utils/enum';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    role: mongoose.Types.ObjectId | IRole;
    createdAt: Date;
    updatedAt: Date;
    oauthProvider?: string;
    oauthId?: string;
    oauthToken?: string;
    walletAddress?: string;
    avatar?: string;
    url?: string;
    displayName?: string;
    from: number;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    oauthProvider: { type: String },
    oauthId: { type: String },
    oauthToken: { type: String },
    walletAddress: { type: String, unique: true },
    avatar: { type: String },
    url: { type: String },
    displayName: { type: String },
    from: { type: Number, default: UserFrom.EMAIL }
}, {
    timestamps: true
});

const User = model<IUser>('User', userSchema);

export default User;

