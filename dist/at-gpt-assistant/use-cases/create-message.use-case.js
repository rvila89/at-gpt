"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageUseCase = void 0;
const createMessageUseCase = async (openai, options) => {
    const { threadId, question } = options;
    const message = await openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: question
    });
    return message;
};
exports.createMessageUseCase = createMessageUseCase;
//# sourceMappingURL=create-message.use-case.js.map