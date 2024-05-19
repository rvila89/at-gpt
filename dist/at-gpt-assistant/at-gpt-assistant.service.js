"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGptAssistantService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const use_cases_1 = require("./use-cases");
let AtGptAssistantService = class AtGptAssistantService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY
        });
    }
    async createThread() {
        return await (0, use_cases_1.createThreadUseCase)(this.openai);
    }
    async userQuestion(questionDto) {
        const { threadId, question } = questionDto;
        const message = await (0, use_cases_1.createMessageUseCase)(this.openai, {
            threadId,
            question
        });
        const run = await (0, use_cases_1.createRunUseCase)(this.openai, { threadId });
        await (0, use_cases_1.checkCompleteStatusUseCase)(this.openai, {
            runId: run.id,
            threadId: threadId
        });
        const messages = await (0, use_cases_1.getMessageListUseCase)(this.openai, { threadId });
        return messages;
    }
};
exports.AtGptAssistantService = AtGptAssistantService;
exports.AtGptAssistantService = AtGptAssistantService = __decorate([
    (0, common_1.Injectable)()
], AtGptAssistantService);
//# sourceMappingURL=at-gpt-assistant.service.js.map