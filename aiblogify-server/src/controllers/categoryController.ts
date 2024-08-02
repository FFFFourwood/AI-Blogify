import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import logger from '../utils/logger';
// get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    logger.info(`getAllCategories:Getting all categories`);
    try {
        const categories = await categoryService.getAllCategories();
        logger.info(`getAllCategories:categories fetched successfully`);
        res.status(200).json(categories);
    } catch (error) {
        logger.error(`getAllCategories:Error fetching categories`);
        res.status(400).json({ message: 'Error fetching categories', error });
    }
};