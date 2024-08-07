import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import logger from '../utils/logger';
// get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Category:Getting all categories`);
    try {
        const categories = await categoryService.getAllCategories();
        logger.info(`Category:categories fetched successfully`);
        res.status(200).json(categories);
    } catch (error) {
        logger.error(`Category:Error fetching categories`);
        res.status(400).json({
            result: false,
            message: 'Error fetching categories',
            error
        });
    }
};

//update category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params;
    const { name } = req.body;
    logger.info(`Category:Updating category`);
    try {
        const category = await categoryService.updateCategory(categoryId, name);
        logger.info(`Category:Category updated successfully`);
        res.status(200).json(
            {
                result: true,
                message: 'Category updated successfully',
                data: category
            }
        );
    } catch (error) {
        logger.error(`Category:Error updating category`);
        res.status(400).json({
            result: false,
            message: 'Error updating category',
            error
        });
    }
};

//delete category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params;
    logger.info(`Category:Deleting category`);
    try {
        await categoryService.deleteCategory(categoryId);
        logger.info(`Category:Category deleted successfully`);
        res.status(200).json({
            result: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        logger.error(`Category:Error deleting category`);
        res.status(400).json({
            result: false,
            message: 'Error deleting category',
            error
        });
    }
}

//get category
export const getCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params;
    logger.info(`Category:Getting category`);
    try {
        const category = await categoryService.getCategoryById(categoryId);
        logger.info(`Category:Category fetched successfully`);
        res.status(200).json(category);
    } catch (error) {
        logger.error(`Category:Error fetching category`);
        res.status(400).json({
            result: false,
            message: 'Error fetching category',
            error
        });
    }
}

//create category
export const createCategories = async (req: Request, res: Response): Promise<void> => {
    const { names } = req.body;
    logger.info(`Category:Creating category`);
    logger.info(`Received names: ${JSON.stringify(names)}`);
    try {
        const category = await categoryService.createCategories(names);
        logger.info(`Category:Category created successfully`);
        res.status(200).json(
            {
                result: true,
                message: 'Category created successfully',
                data: category
            }
        );
    } catch (error) {
        logger.error(`Category:Error creating category`);
        res.status(400).json({
            result: false,
            message: 'Error creating category',
            error
        });
    }
}