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
exports.GptController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("./dtos");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const gpt_service_1 = require("./gpt.service");
let GptController = class GptController {
    constructor(gptService) {
        this.gptService = gptService;
    }
    orthographyCheck(orthograpyDTO) {
        return this.gptService.orthographyCheck(orthograpyDTO);
    }
    prosConsDiscusser(prosConsDiscusserDTO) {
        return this.gptService.prosConsDiscusser(prosConsDiscusserDTO);
    }
    async prosConsDicusserStream(prosConsDiscusserDto, res) {
        const stream = await this.gptService.prosConsDiscusserStream(prosConsDiscusserDto);
        res.setHeader('Content-Type', 'application/json');
        res.status(common_1.HttpStatus.OK);
        for await (const chunk of stream) {
            const piece = chunk.choices[0].delta.content || '';
            console.log(piece);
            res.write(piece);
        }
        res.end();
    }
    traslate(translateDTO) {
        return this.gptService.translate(translateDTO);
    }
    async textToAudio(textToAudioDTO, res) {
        const filePath = await this.gptService.textToAudio(textToAudioDTO);
        res.setHeader('Content-Type', 'audio/mp3');
        res.status(common_1.HttpStatus.OK);
        res.sendFile(filePath);
    }
    async textToAudioGetter(res, fileId) {
        const filePath = await this.gptService.textToAudioGetter(fileId);
        res.setHeader('Content-Type', 'audio/mp3');
        res.status(common_1.HttpStatus.OK);
        res.sendFile(filePath);
    }
    async audioToText(file, audioToTextDTO) {
        return this.gptService.audioToText(file, audioToTextDTO);
    }
    async imageGeneration(imageGenerationDTO) {
        return await this.gptService.imageGeneration(imageGenerationDTO);
    }
    async getGeneratedImage(res, fileName) {
        const filePath = await this.gptService.textToAudioGetter(fileName);
        res.setHeader('Content-Type', 'audio/mp3');
        res.status(common_1.HttpStatus.OK);
        res.sendFile(filePath);
    }
};
exports.GptController = GptController;
__decorate([
    (0, common_1.Post)('orthography-check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.OrtographyDTO]),
    __metadata("design:returntype", void 0)
], GptController.prototype, "orthographyCheck", null);
__decorate([
    (0, common_1.Post)('pros-cons-discusser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ProsConsDiscusserDTO]),
    __metadata("design:returntype", void 0)
], GptController.prototype, "prosConsDiscusser", null);
__decorate([
    (0, common_1.Post)('pros-cons-discusser-stream'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ProsConsDiscusserDTO, Object]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "prosConsDicusserStream", null);
__decorate([
    (0, common_1.Post)('translate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.TranslateDTO]),
    __metadata("design:returntype", void 0)
], GptController.prototype, "traslate", null);
__decorate([
    (0, common_1.Post)('text-to-audio'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.TextToAudioDTO, Object]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "textToAudio", null);
__decorate([
    (0, common_1.Get)('text-to-audio/:fileId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "textToAudioGetter", null);
__decorate([
    (0, common_1.Post)('audio-to-text'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './generated/uploads',
            filename: (req, file, cb) => {
                const fileExtension = file.originalname.split('.').pop();
                const fileName = `${new Date().getTime()}.${fileExtension}`;
                return cb(null, fileName);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 1000 * 1024 * 5,
                message: 'File is bigger than 5 mb'
            }),
            new common_1.FileTypeValidator({ fileType: 'audio/*' })
        ]
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.AudioToTextDTO]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "audioToText", null);
__decorate([
    (0, common_1.Post)('image-generation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ImageGenerationDTO]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "imageGeneration", null);
__decorate([
    (0, common_1.Get)('image-generation/:fileName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GptController.prototype, "getGeneratedImage", null);
exports.GptController = GptController = __decorate([
    (0, common_1.Controller)('gpt'),
    __metadata("design:paramtypes", [gpt_service_1.GptService])
], GptController);
//# sourceMappingURL=gpt.controller.js.map