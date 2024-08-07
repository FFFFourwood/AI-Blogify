import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
    name: string;
    permissions: number[];
}

const roleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    permissions: { type: [Number], required: true }
});

const Role = model<IRole>('Role', roleSchema);
export default Role;
