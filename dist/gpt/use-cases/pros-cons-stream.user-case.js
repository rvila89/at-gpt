"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prosConsDiscusserStreamUseCase = void 0;
const prosConsDiscusserStreamUseCase = async (openai, options) => {
    const { prompt } = options;
    return await openai.chat.completions.create({
        stream: true,
        messages: [
            {
                role: 'system',
                content: `
          Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de ser en formato markdown,
          los pros y contras deben de estar en una lista,
        `
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: 'gpt-4',
        temperature: 0.8,
        max_tokens: 300
    });
};
exports.prosConsDiscusserStreamUseCase = prosConsDiscusserStreamUseCase;
//# sourceMappingURL=pros-cons-stream.user-case.js.map