import { Request, Response } from 'express';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

// 注册
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = await authService.register(username, email, password);
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// 登录
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login(email, password);

        if (!result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { user, token } = result;
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// OAuth 登录或注册
export const oauthLogin = async (req: Request, res: Response) => {
    const { oauthProvider, oauthId, email, username, token } = req.body;

    try {
        const result = await authService.oauthLogin(oauthProvider, oauthId, email, username, token);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in with OAuth', error });
    }
};

// 区块链钱包登录
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

// 注销
export const logout = async (req: Request, res: Response) => {
    res.json({ message: 'User logged out' });
};

// 验证 JWT 令牌
export const verifyToken = (req: Request, res: Response) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ decoded });
    } catch (error) {
        res.status(401).json({ message: 'Failed to authenticate token', error });
    }
};
