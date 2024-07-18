import { Request, Response } from 'express';
import auditService from '../services/auditService';

export const logAction = async (req: Request, res: Response) => {
    const { action, details } = req.body;
    try {
        const audit = await auditService.logAction(action, details, req.user!.id);
        res.status(201).json(audit);
    } catch (error) {
        res.status(500).json({ message: 'Error logging action', error });
    }
};

export const getAuditLogs = async (req: Request, res: Response) => {
    try {
        const audits = await auditService.getAuditLogs();
        res.json(audits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching audit logs', error });
    }
};
