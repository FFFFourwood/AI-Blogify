import Audit, { IAudit } from '../models/auditModel';

const logAction = async (action: string, details: any, userId: string): Promise<IAudit> => {
    const audit = new Audit({ action, details, user: userId });
    await audit.save();
    return audit;
};

const getAuditLogs = async (): Promise<IAudit[]> => {
    return Audit.find().populate('user', 'username email');
};

export default {
    logAction,
    getAuditLogs,
};
