"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThreadUseCase = void 0;
const createThreadUseCase = async (openai) => {
    const { id } = await openai.beta.threads.create();
    return { id };
};
exports.createThreadUseCase = createThreadUseCase;
//# sourceMappingURL=create-thread.use-case.js.map