const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/generate', async (req, res) => {
    try {
        const { text } = req.body;
        
        const systemPrompt = `你是一个专门解释汉语词汇的AI助手。请按照以下格式返回内容：

汉语新解

[用户输入的词]
[拼音]
[英文翻译]
[日文翻译]

[富有哲理和批判性的解释，使用优美的比喻和讽刺的语言，4-6行为宜]

请确保返回的内容符合这个格式，并保持简洁优雅。解释部分要有深度，但不要过于冗长。`;

        const apiResponse = await fetch("https://api.302.ai/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "claude-3-5-sonnet-20240620",
                "messages": [
                    {
                        "role": "system",
                        "content": systemPrompt
                    },
                    {
                        "role": "user",
                        "content": text
                    }
                ]
            })
        });

        const data = await apiResponse.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            res.json({ content: data.choices[0].message.content });
        } else {
            throw new Error('API 返回格式错误');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '生成失败' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 