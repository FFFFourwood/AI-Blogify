import { Request, Response } from 'express';
import reportService from '../services/reportService';

export const generateReport = async (req: Request, res: Response) => {
    const { reportType, data } = req.body;
    try {
        const report = await reportService.generateReport(reportType, data);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};

export const getReports = async (req: Request, res: Response) => {
    try {
        const reports = await reportService.getReports();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};
