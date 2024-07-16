import { Request, Response } from 'express';
import walletService from '../services/walletService';

export const bindWallet = async (req: Request, res: Response) => {
    const { walletAddress } = req.body;
    try {
        const user = await walletService.bindWallet(req.user!.id, walletAddress);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error binding wallet', error });
    }
};
