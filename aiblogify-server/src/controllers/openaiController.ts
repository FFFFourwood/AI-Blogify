import { Request, Response } from 'express';
import openaiService from '../services/openAIService';

export const generateText = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const result = await openaiService.generateText(prompt);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error generating text', error });
    }
};
