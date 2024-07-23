import cron from 'node-cron';
import OpenAIService from '../services/openaiService';

// 每天凌晨重置每日使用量
cron.schedule('0 0 * * *', async () => {
    await OpenAIService.resetDailyUsage();
    console.log('Daily usage reset');
});