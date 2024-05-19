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
exports.AtGptAssistantController = void 0;
const common_1 = require("@nestjs/common");
const at_gpt_assistant_service_1 = require("./at-gpt-assistant.service");
const question_dto_1 = require("./dtos/question.dto");
let AtGptAssistantController = class AtGptAssistantController {
    constructor(atGptAssistantService) {
        this.atGptAssistantService = atGptAssistantService;
    }
    async createThread() {
        return await this.atGptAssistantService.createThread();
    }
    async userQuestion(questionDto) {
        return await this.atGptAssistantService.userQuestion(questionDto);
    }
};
exports.AtGptAssistantController = AtGptAssistantController;
__decorate([
    (0, common_1.Post)('create-thread'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AtGptAssistantController.prototype, "createThread", null);
__decorate([
    (0, common_1.Post)('user-question'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], AtGptAssistantController.prototype, "userQuestion", null);
exports.AtGptAssistantController = AtGptAssistantController = __decorate([
    (0, common_1.Controller)('at-gpt-assistant'),
    __metadata("design:paramtypes", [at_gpt_assistant_service_1.AtGptAssistantService])
], AtGptAssistantController);
//# sourceMappingURL=at-gpt-assistant.controller.js.map