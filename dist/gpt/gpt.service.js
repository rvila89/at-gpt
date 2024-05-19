"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptService = void 0;
const path = require("path");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const use_cases_1 = require("./use-cases");
const openai_1 = require("openai");
let GptService = class GptService {
    constructor() {
        this.openai = new openai_1.default({
            apiKey: process.env.OPENAI_API_LEY
        });
    }
    async orthographyCheck(orthographyDTO) {
        return await (0, use_cases_1.orthographyCheckUseCase)(this.openai, {
            prompt: orthographyDTO.prompt
        });
    }
    async prosConsDiscusser(prosConsDiscusser) {
        return await (0, use_cases_1.prosConsDiscusserUseCase)(this.openai, {
            prompt: prosConsDiscusser.prompt
        });
    }
    async prosConsDiscusserStream(prosConsDiscusser) {
        return await (0, use_cases_1.prosConsDiscusserStreamUseCase)(this.openai, {
            prompt: prosConsDiscusser.prompt
        });
    }
    async translate(translate) {
        return await (0, use_cases_1.translateUseCase)(this.openai, {
            prompt: translate.prompt,
            lang: translate.lang
        });
    }
    async textToAudio({ prompt, voice }) {
        return await (0, use_cases_1.textToAudioUseCase)(this.openai, { prompt, voice });
    }
    async textToAudioGetter(fileId) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
        const wasFound = fs.existsSync(filePath);
        if (!wasFound)
            throw new common_1.NotFoundException(`File ${fileId} not found`);
        return filePath;
    }
    async audioToText(audioFile, audioToTextDTO) {
        const { prompt } = audioToTextDTO;
        return await (0, use_cases_1.audioToTextUseCase)(this.openai, { audioFile, prompt });
    }
    async imageGeneration(imageGenerationDTO) {
        return (0, use_cases_1.imageGenerationUseCase)(this.openai, { ...imageGenerationDTO });
    }
    async getGeneratedImage(fileId) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);
        const wasFound = fs.existsSync(filePath);
        if (!wasFound)
            throw new common_1.NotFoundException(`File ${fileId} not found`);
        return filePath;
    }
};
exports.GptService = GptService;
exports.GptService = GptService = __decorate([
    (0, common_1.Injectable)()
], GptService);
//# sourceMappingURL=gpt.service.js.map