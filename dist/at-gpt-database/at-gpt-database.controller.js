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
exports.AtGptDatabaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const at_gpt_database_service_1 = require("./at-gpt-database.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let AtGptDatabaseController = class AtGptDatabaseController {
    constructor(atGptDatabaseService) {
        this.atGptDatabaseService = atGptDatabaseService;
    }
    async uploadPdf(file) {
        return this.atGptDatabaseService.uploadFile(file);
    }
    async findAll() {
        return this.atGptDatabaseService.findAllPeople();
    }
    async generatePdf(res, idPersona) {
        const pdfBuffer = await this.atGptDatabaseService.generatePdf(Number(idPersona));
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=cv.pdf',
            'Content-Length': pdfBuffer.length
        });
        res.end(pdfBuffer);
    }
};
exports.AtGptDatabaseController = AtGptDatabaseController;
__decorate([
    (0, common_1.Post)('upload-pdf'),
    (0, swagger_1.ApiOperation)({
        summary: 'Give pdf file, it will extract data and insert into DB'
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadPath = (0, path_1.join)('/tmp', 'generated', 'uploads', 'cv');
                cb(null, uploadPath);
            },
            filename: (req, file, callback) => {
                callback(null, `${file.originalname}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AtGptDatabaseController.prototype, "uploadPdf", null);
__decorate([
    (0, common_1.Get)('personas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AtGptDatabaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('personas/:idPersona'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('idPersona')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AtGptDatabaseController.prototype, "generatePdf", null);
exports.AtGptDatabaseController = AtGptDatabaseController = __decorate([
    (0, swagger_1.ApiTags)('AI'),
    (0, common_1.Controller)('at-gpt'),
    __metadata("design:paramtypes", [at_gpt_database_service_1.AtGptDatabaseService])
], AtGptDatabaseController);
//# sourceMappingURL=at-gpt-database.controller.js.map