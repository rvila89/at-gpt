"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangchainChatModule = void 0;
const common_1 = require("@nestjs/common");
const langchain_chat_service_1 = require("./langchain-chat.service");
const langchain_chat_controller_1 = require("./langchain-chat.controller");
let LangchainChatModule = class LangchainChatModule {
};
exports.LangchainChatModule = LangchainChatModule;
exports.LangchainChatModule = LangchainChatModule = __decorate([
    (0, common_1.Module)({
        controllers: [langchain_chat_controller_1.LangchainChatController],
        providers: [langchain_chat_service_1.LangchainChatService]
    })
], LangchainChatModule);
//# sourceMappingURL=langchain-chat.module.js.map