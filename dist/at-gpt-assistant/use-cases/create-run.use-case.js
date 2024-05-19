"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunUseCase = void 0;
const createRunUseCase = async (openai, options) => {
    const { threadId, assistantId = 'asst_qrcAzk5T5dJL2fBy5CFGadAj' } = options;
    console.log('threadId', threadId);
    console.log('assistantId', assistantId);
    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
    });
    console.log(run);
    return run;
};
exports.createRunUseCase = createRunUseCase;
//# sourceMappingURL=create-run.use-case.js.map