document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const userInput = document.getElementById('userInput');
    const resultContainer = document.getElementById('result');

    generateBtn.addEventListener('click', async () => {
        const text = userInput.value.trim();
        if (!text) {
            alert('请输入内容');
            return;
        }

        try {
            generateBtn.disabled = true;
            generateBtn.textContent = '生成中...';

            const response = await fetch('http://124.220.11.240/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();
            if (data.content) {
                // 创建卡片容器
                const card = document.createElement('div');
                card.className = 'interpretation-card';
                
                // 创建标题
                const title = document.createElement('h2');
                title.className = 'card-title';
                title.textContent = '汉语新解';
                
                // 创建分隔线
                const divider = document.createElement('div');
                divider.className = 'divider';
                
                // 创建主标题（用户输入的词）
                const mainWord = document.createElement('h3');
                mainWord.className = 'main-word';
                mainWord.textContent = text;

                // 解析API返回的内容
                const lines = data.content.split('\n').filter(line => line.trim());
                
                // 创建翻译容器
                const translationContainer = document.createElement('div');
                translationContainer.className = 'translation-container';

                // 提取拼音、英文和日文翻译（假设它们是第3、4、5行）
                if (lines.length >= 5) {
                    const pinyin = document.createElement('div');
                    pinyin.className = 'translation-text';
                    pinyin.textContent = lines[2]; // 拼音

                    const english = document.createElement('div');
                    english.className = 'translation-text';
                    english.textContent = lines[3]; // 英文

                    const japanese = document.createElement('div');
                    japanese.className = 'translation-text';
                    japanese.textContent = lines[4]; // 日文

                    translationContainer.appendChild(pinyin);
                    translationContainer.appendChild(english);
                    translationContainer.appendChild(japanese);
                }

                // 创建解释内容（第6行开始）
                const content = document.createElement('div');
                content.className = 'interpretation';
                content.textContent = lines.slice(5).join('\n');
                
                // 组装卡片
                card.appendChild(title);
                card.appendChild(divider);
                card.appendChild(mainWord);
                card.appendChild(translationContainer);
                card.appendChild(content);
                
                // 清空容器并添加新卡片
                resultContainer.innerHTML = '';
                resultContainer.appendChild(card);
            } else {
                throw new Error('生成失败');
            }
        } catch (error) {
            alert('生成失败，请重试');
            console.error(error);
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = '一针见血';
        }
    });
}); 