import { Request, Response } from 'express';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import User, { IUser } from '../models/userModel';

// login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    logger.info(`Login request received for email: ${email}`);
    try {
        const result = await authService.login(email, password);

        if (!result) {
            logger.warn(`Invalid email or password for email: ${email}`);
            return res.status(401).json({ result: false, message: 'Invalid email or password' });
        }

        const { user, token } = result;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 72 * 60 * 60 * 1000 // 72 hours
        });
        logger.info(`Login successful for email: ${email}`);
        res.status(200).json({ result: true, token, user });
    } catch (error) {
        logger.error(`Error logging in for email: ${email}`);
        logger.error(error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    logger.info(`Logout request received`);
    res.status(200).json({ message: 'Logged out successfully' });
};

// verify jwt Token
export const verifyToken = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    logger.info(token);

    if (!token) {
        logger.info(`verifyToken:No token provided`);
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = authService.verifyTokenFn(token);
        const user = await User.findById(decoded.userId).select('-password');
        logger.info(`verifyToken:Token verified successfully`);
        res.json({ user });
    } catch (error) {
        logger.error(`verifyToken:Failed to authenticate token`);
        res.status(401).json({ message: 'Failed to authenticate token', error });
    }
};




















// register
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = await authService.register(username, email, password);
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};


// OAuth 
export const oauthLogin = async (req: Request, res: Response) => {
    const { oauthProvider, oauthId, email, username, token } = req.body;

    try {
        const result = await authService.oauthLogin(oauthProvider, oauthId, email, username, token);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in with OAuth', error });
    }
};

// wallet login
export const walletLogin = async (req: Request, res: Response) => {
    const { walletAddress } = req.body;

    try {
        const result = await authService.walletLogin(walletAddress);

        if (!result) {
            return res.status(404).json({ message: 'Wallet address not found' });
        }

        const { user, token } = result;
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in with wallet', error });
    }
};


