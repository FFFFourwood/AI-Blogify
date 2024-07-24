import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import logger from './logger';
import User from '../models/userModel';
import Role from '../models/roleModel';
import { ApiToken } from '../models/openAIModel';
import { Permission } from '../config/permissions';
import loadEnvironmentVariables from '../config/loadEnv';
loadEnvironmentVariables();

const initDatabase = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
        });
        logger.info('Connected to MongoDB');

        const roles = await Role.find({});
        if (roles.length === 0) {
            logger.info('No roles found, creating default roles.');
            const adminRole = new Role({
                name: 'admin',
                permissions: [
                    Permission.ADMIN,
                    Permission.MANAGE,
                    Permission.VIEW,
                    Permission.WRITE,
                    Permission.DELETE,
                    Permission.REPORT,
                    Permission.AUDIT,
                    Permission.COMMENT,
                    Permission.EDIT
                ]
            });
            const userRole = new Role({
                name: 'user',
                permissions: [
                    Permission.VIEW,
                    Permission.COMMENT,
                ]
            });
            const guestRole = new Role({
                name: 'guest',
                permissions: [
                    Permission.VIEW,
                ]
            });

            await adminRole.save();
            await userRole.save();
            await guestRole.save();
            logger.info('Default roles created.');
        } else {
            logger.info('Roles already exist.');
        }

        const adminUser = await User.findOne({ username: 'admin' });
        if (!adminUser) {
            logger.info('Admin user not found, creating admin user.');
            const adminRole = await Role.findOne({ name: 'admin' });
            const newAdminUser = new User({
                username: 'admin',
                email: 'admin@aiblogify.com',
                password: await bcrypt.hash('admin', 10),
                role: adminRole!._id,
                avatar: 'https://gravatar.loli.net/avatar/fc030a0ab5265a8b5c042cfdea61e2e5?d=mm'
            });
            await newAdminUser.save();
            logger.info('Admin user created.');
        } else {
            logger.info('Admin user already exists.');
        }

        const openAIApiKey = process.env.OPENAI_API_KEY;
        const openAIApiUrl = process.env.OPENAI_API_URL;

        if (openAIApiKey && openAIApiUrl) {
            const openAIData = new ApiToken({
                token: openAIApiKey,
                name: 'default',
                apiUrl: openAIApiUrl,
                isDefault:true
            })
            await openAIData.save();
            logger.info('OpenAI API key and URL saved to database.');
        }
    } catch (error) {
        logger.error('Error initializing database:', error);
    } finally {
        mongoose.connection.close();
        logger.info('MongoDB connection closed');
    }
};

initDatabase().catch(err => {
    logger.error('Uncaught error:', err);
    process.exit(1);
});
