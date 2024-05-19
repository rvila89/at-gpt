"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAiUseCase = void 0;
const openAiUseCase = async (openai, prompt) => {
    const response = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `Given an input question return the answer.
        Always answer in Spanish. If you don't know the answer, just say that you don't know, don't try to make up an answer.
       
        `
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: 'gpt-4',
        temperature: 0.8
    });
    console.log('response', response.choices[0].message.content);
    return response.choices[0].message.content;
};
exports.openAiUseCase = openAiUseCase;
//# sourceMappingURL=open-ai-use-case.js.map