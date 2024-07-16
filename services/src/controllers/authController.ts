import { Request, Response } from 'express';
import authService from '../services/authService';

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

// 注销
export const logout = async (req: Request, res: Response) => {
    res.json({ message: 'User logged out' });
};
