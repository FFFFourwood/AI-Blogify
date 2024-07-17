import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            const admin = new User({
                username: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
            });

            await admin.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.connection.close();
    }
};

seedAdmin();
