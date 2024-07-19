import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import Role from '../models/roleModel';
import authService from '../services/authService';

interface CustomRequest extends Request {
    userId?: string;
}


const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = authService.verifyTokenFn(token);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid token, user not found' });
        }
        req.user = user;

        const newToken = authService.refreshToken(user._id);
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 72 * 60 * 60 * 1000 // 72 hours
        });
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;

export const authorize = (permissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const userPermissions = user.role.permissions;

        const hasPermission = permissions.every(permission => userPermissions.includes(permission));
        if (!hasPermission) {
            return res.status(403).json({ message: 'You do not have the required permissions' });
        }

        next();
    };
};