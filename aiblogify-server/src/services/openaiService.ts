import axios from 'axios';
import { ApiToken, IApiToken, UsageLog } from '../models/openAIModel';
import { Types } from 'mongoose';

class OpenAIService {
    private static instance: OpenAIService;

    private constructor() { }

    public static getInstance(): OpenAIService {
        if (!OpenAIService.instance) {
            OpenAIService.instance = new OpenAIService();
        }
        return OpenAIService.instance;
    }

    async callOpenAI(apiToken: string, prompt: string): Promise<any> {
        const tokenRecord = await ApiToken.findOne({ token: apiToken });

        if (!tokenRecord) {
            throw new Error('Invalid API token');
        }

        // 检查每日限额
        if (tokenRecord.usedToday >= tokenRecord.dailyLimit) {
            throw new Error('Daily limit exceeded');
        }

        // 检查总限额
        if (tokenRecord.usedTotal >= tokenRecord.totalLimit) {
            throw new Error('Total limit exceeded');
        }

        // 调用 OpenAI API
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 50
        }, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });

        const usage = response.data.usage.total_tokens;
        tokenRecord.usedToday += usage;
        tokenRecord.usedTotal += usage;
        await tokenRecord.save();

        // 记录使用日志
        await UsageLog.create({
            token: tokenRecord._id,
            date: new Date(),
            usage,
        });

        return response.data;
    }

    async resetDailyUsage() {
        const tokens = await ApiToken.find();
        tokens.forEach(async (token: IApiToken) => {
            token.usedToday = 0;
            await token.save();
        });
    }
}

export default OpenAIService.getInstance();