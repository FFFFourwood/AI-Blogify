import axios from 'axios';

const OPENAI_API_URL = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/engines/text-davinci-003/completions';

const generateText = async (prompt: string): Promise<any> => {
    const response = await axios.post(
        OPENAI_API_URL,
        {
            prompt,
            max_tokens: 100,
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};

export default {
    generateText,
};
