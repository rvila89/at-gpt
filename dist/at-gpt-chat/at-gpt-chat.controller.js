"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGptChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const at_gpt_chat_service_1 = require("./at-gpt-chat.service");
let AtGptChatController = class AtGptChatController {
    constructor(atGptChatService) {
        this.atGptChatService = atGptChatService;
    }
    async chat(prompt) {
        try {
            const data = await this.atGptChatService.chat(prompt);
            return { success: true, data };
        }
        catch (err) {
            return { success: false, messageError: err };
        }
    }
};
exports.AtGptChatController = AtGptChatController;
__decorate([
    (0, common_1.Get)('chat'),
    (0, swagger_1.ApiOperation)({
        summary: 'Give Prompt to the Agent, it will generate and execute SQL on given schema'
    }),
    __param(0, (0, common_1.Query)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AtGptChatController.prototype, "chat", null);
exports.AtGptChatController = AtGptChatController = __decorate([
    (0, swagger_1.ApiTags)('AI'),
    (0, common_1.Controller)('at-gpt'),
    __metadata("design:paramtypes", [at_gpt_chat_service_1.AtGptChatService])
], AtGptChatController);
//# sourceMappingURL=at-gpt-chat.controller.js.map