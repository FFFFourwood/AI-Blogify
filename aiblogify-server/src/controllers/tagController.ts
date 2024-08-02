import { Request, Response } from 'express';
import * as tagService from '../services/tagService';
import logger from '../utils/logger';
// get all tags
export const getAllTags = async (req: Request, res: Response): Promise<void> => {
    logger.info(`Tag:Getting all tags`);
    try {
        const tags = await tagService.getAllTags();
        logger.info(`Tag:tags fetched successfully`);
        res.status(200).json(tags);
    } catch (error) {
        logger.error(`Tag:Error fetching tags`);
        res.status(400).json({
            result: false,
            message: 'Error fetching tags',
            error
        });
    }
};

//update tag
export const updateTag = async (req: Request, res: Response): Promise<void> => {
    const { tagId } = req.params;
    const { name } = req.body;
    logger.info(`Tag:Updating tag`);
    try {
        const tag = await tagService.updateTag(tagId, name);
        logger.info(`Tag:Tag updated successfully`);
        res.status(200).json(
            {
                result: true,
                message: 'Tag updated successfully',
                data: tag
            }
        );
    } catch (error) {
        logger.error(`Tag:Error updating tag`);
        res.status(400).json({
            result: false,
            message: 'Error updating tag',
            error
        });
    }
};

//delete tag
export const deleteTag = async (req: Request, res: Response): Promise<void> => {
    const { tagId } = req.params;
    logger.info(`Tag:Deleting tag`);
    try {
        await tagService.deleteTag(tagId);
        logger.info(`Tag:Tag deleted successfully`);
        res.status(200).json({
            result: true,
            message: 'Tag deleted successfully'
        });
    } catch (error) {
        logger.error(`Tag:Error deleting tag`);
        res.status(400).json({
            result: false,
            message: 'Error deleting tag',
            error
        });
    }
}

//get tag
export const getTag = async (req: Request, res: Response): Promise<void> => {
    const { tagId } = req.params;
    logger.info(`Tag:Getting tag`);
    try {
        const tag = await tagService.getTagById(tagId);
        logger.info(`Tag:Tag fetched successfully`);
        res.status(200).json(tag);
    } catch (error) {
        logger.error(`Tag:Error fetching tag`);
        res.status(400).json({
            result: false,
            message: 'Error fetching tag',
            error
        });
    }
}

//create tag
export const createTags = async (req: Request, res: Response): Promise<void> => {
    const { names } = req.body;
    logger.info(`Tag:Creating tag`);
    logger.info(`Received names: ${JSON.stringify(names)}`);
    try {
        const tag = await tagService.createTags(names);
        logger.info(`Tag:Tag created successfully`);
        res.status(200).json(
            {
                result: true,
                message: 'Tag created successfully',
                data: tag
            }
        );
    } catch (error) {
        logger.error(`Tag:Error creating tag`);
        res.status(400).json({
            result: false,
            message: 'Error creating tag',
            error
        });
    }
}