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
exports.LangchainChatController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const langchain_chat_service_1 = require("./langchain-chat.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let LangchainChatController = class LangchainChatController {
    constructor(langchainChatService) {
        this.langchainChatService = langchainChatService;
    }
    async chat(prompt) {
        try {
            const data = await this.langchainChatService.chat(prompt);
            return { success: true, data };
        }
        catch (err) {
            return { success: false, messageError: err };
        }
    }
    async uploadPdf(file) {
        return this.langchainChatService.uploadFile(file);
    }
};
exports.LangchainChatController = LangchainChatController;
__decorate([
    (0, common_1.Get)('chat'),
    (0, swagger_1.ApiOperation)({
        summary: 'Give Prompt to the Agent, it will generate and execute SQL on given schema'
    }),
    __param(0, (0, common_1.Query)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LangchainChatController.prototype, "chat", null);
__decorate([
    (0, common_1.Post)('upload-pdf'),
    (0, swagger_1.ApiOperation)({
        summary: 'Give pdf file, it will extract data and insert into DB'
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './generated/uploads',
            filename: (req, file, callback) => {
                callback(null, `${file.originalname}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LangchainChatController.prototype, "uploadPdf", null);
exports.LangchainChatController = LangchainChatController = __decorate([
    (0, swagger_1.ApiTags)('AI'),
    (0, common_1.Controller)('at-gpt'),
    __metadata("design:paramtypes", [langchain_chat_service_1.LangchainChatService])
], LangchainChatController);
//# sourceMappingURL=langchain-chat.controller.js.map