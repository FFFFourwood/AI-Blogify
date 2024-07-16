import Report, { IReport } from '../models/reportModel';

const generateReport = async (reportType: string, data: any): Promise<IReport> => {
    const report = new Report({ reportType, data });
    await report.save();
    return report;
};

const getReports = async (): Promise<IReport[]> => {
    return Report.find();
};

export default {
    generateReport,
    getReports,
};
