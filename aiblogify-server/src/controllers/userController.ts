import { Request, Response } from 'express';
import userService from '../services/userService';
import logger from '../utils/logger';
import { log } from 'console';

//get user role permissions
export const getRolePermissions = async (req: Request, res: Response) => {
    try {
        logger.info(`getRolePermissions:Getting role permissions for role id: ${req.params.id}`);
        const role = await userService.getRoleById(req.params.id);
        if (!role) {
            logger.warn(`getRolePermissions:Role not found for role id: ${req.params.id}`);
            return res.status(404).json({ message: 'Role not found' });
        }
        logger.info(`getRolePermissions:Role permissions fetched for role id: ${req.params.id}`);
        res.json(role);
    } catch (error) {
        logger.error(`getRolePermissions:Error getting role permissions for role id: ${req.params.id}`);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};



















// 获取所有用户
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// 获取单个用户
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// 更新用户资料
export const updateUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;

    try {
        const user = await userService.updateUser(req.params.id, username, email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// 删除用户
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
