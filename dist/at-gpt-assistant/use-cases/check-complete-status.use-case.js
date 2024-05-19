"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCompleteStatusUseCase = void 0;
const checkCompleteStatusUseCase = async (openai, options) => {
    const { threadId, runId } = options;
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log({ runstatus: runStatus.status });
    if (runStatus.status === 'completed') {
        return runStatus;
    }
    else if (runStatus.status === 'failed') {
        console.log(runStatus.status);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await (0, exports.checkCompleteStatusUseCase)(openai, options);
};
exports.checkCompleteStatusUseCase = checkCompleteStatusUseCase;
//# sourceMappingURL=check-complete-status.use-case.js.map