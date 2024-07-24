import { Request, Response } from 'express';
import OpenAIService from '../services/openAIService';
import Article from '../models/articleModel';
import { OPENAI_MODEL } from '../utils/constants';
import logger from '../utils/logger';

import * as categoryService from '../services/categoryService';
import * as articleCategoryService from '../services/articleCategoryService';
const formatReqData = (prompt: string, msg: string) => {
    return {
        "model": OPENAI_MODEL,
        "response_format": {
            "type": "json_object"
        },
        "messages": [
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "user",
                "content": msg
            }
        ]
    }
}
export const generateBlogBasicInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        const prompt = `# Role\n博客文章信息提取器\n\n## Skills\n- 精通中文英文\n- 能够理解文本\n- 精通JSON数据格式\n\n## Action\n- 根据博客文章内容，总结信息，并以JSON格式输出，所有内容均用英语返回\n\n## Constrains\n- 忽略无关内容\n- 总结文章的description描述 // description:string\n- 总结文章涉及到的tags // tags:string[]\n- 总结文章涉及到的分类categories // categories:string[]\n- 必须保证你的结果只包含一个合法的JSON格式\n\n## Format\n- 对应JSON的key为：description, tags, categorie,name`
        const data = formatReqData(prompt, article.content);
        const result = await OpenAIService.callOpenAI(data)
        const responseContent = result?.choices?.at(0)?.message?.content;
        if (!responseContent) {
            logger.error('Error generating blog info');
            return res.status(200).json({ result: false, message: 'Error generating text', error: 'Error generating text' });
        }
        logger.info('successfully generated blog info by openai service ')
        const openaiRes = JSON.parse(responseContent)
        const categories = await categoryService.createCategories(openaiRes.categories)
        logger.info('successfully created categories by openai service ')
        await articleCategoryService.addCategoriesToArticle(id, categories.map(category => category._id));
        logger.info('successfully added categories to article by openai service ')

        res.json({
            result: true,
            data: {
                name: openaiRes.name,
                description: openaiRes.description,
                tags: [],
                categories: categories
            }
        });
    } catch (error) {
        logger.error('Error generating blog info');
        logger.error(error);
        res.status(500).json({ result: false, message: 'Error generating text', error });
    }
};
// export const generateText = async (req: Request, res: Response) => {
//     try {
//         const { prompt } = req.body;
//         const result = await openaiService.generateText(prompt);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ message: 'Error generating text', error });
//     }
// };
