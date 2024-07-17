import mongoose from 'mongoose';
import logger from './logger';

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        });
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
