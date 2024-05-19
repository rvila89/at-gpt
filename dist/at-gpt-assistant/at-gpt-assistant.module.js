"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGptAssistantModule = void 0;
const common_1 = require("@nestjs/common");
const at_gpt_assistant_service_1 = require("./at-gpt-assistant.service");
const at_gpt_assistant_controller_1 = require("./at-gpt-assistant.controller");
let AtGptAssistantModule = class AtGptAssistantModule {
};
exports.AtGptAssistantModule = AtGptAssistantModule;
exports.AtGptAssistantModule = AtGptAssistantModule = __decorate([
    (0, common_1.Module)({
        controllers: [at_gpt_assistant_controller_1.AtGptAssistantController],
        providers: [at_gpt_assistant_service_1.AtGptAssistantService]
    })
], AtGptAssistantModule);
//# sourceMappingURL=at-gpt-assistant.module.js.map