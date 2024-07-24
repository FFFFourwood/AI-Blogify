import axios from 'axios';
import { ApiToken, IApiToken, UsageLog } from '../models/openAIModel';
import logger from '../utils/logger';

class OpenAIService {
    private static instance: OpenAIService;

    private constructor() { }

    public static getInstance(): OpenAIService {
        if (!OpenAIService.instance) {
            OpenAIService.instance = new OpenAIService();
        }
        return OpenAIService.instance;
    }

    async callOpenAI(prompt: any): Promise<any> {
        const tokenRecord = await ApiToken.findOne({ isDefault: true });

        if (!tokenRecord) {
            throw new Error('Invalid API token');
        }
        // Check daily limit
        if (tokenRecord.usedToday >= tokenRecord.dailyLimit) {
            logger.info('openai service:Daily limit exceeded')
            throw new Error('Daily limit exceeded');
        }

        // Check total limit
        if (tokenRecord.usedTotal >= tokenRecord.totalLimit) {
            logger.info('openai service:Total limit exceeded')
            throw new Error('Total limit exceeded');
        }
        try {
            // Use the OpenAI API.
            const response = await axios.post(`${tokenRecord.apiUrl}/v1/chat/completions`, prompt, {
                headers: {
                    'Authorization': `Bearer ${tokenRecord.token}`
                }
            });
            const usage = response.data.usage.total_tokens;
            tokenRecord.usedToday += usage;
            tokenRecord.usedTotal += usage;
            logger.info('openai service:usage:' + usage)
            logger.info('openai service:usage today:' + tokenRecord.usedToday)
            logger.info('openai service:usage total:' + tokenRecord.usedTotal)
            await tokenRecord.save();

            // Record usage log
            await UsageLog.create({
                tokenRefId: tokenRecord._id,
                token: tokenRecord.token,
                date: new Date(),
                usage,
            });

            return response.data;
        } catch (error: any) {
            if (error.response) {
                logger.error(`openai service:error:AxiosError: ${error.response.status} - ${error.response.statusText}`);
                logger.error(`openai service:error:Response Data: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                logger.error('openai service:error:No response received from OpenAI API');
            } else {
                logger.error('openai service:error:Error setting up the request: ' + error.message);
            }
            return {
                result: false,
                message: 'Error generating blog info by openAI service',
                error: error.message
            }
        }

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