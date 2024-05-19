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
exports.AtGptDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("@langchain/openai");
const upload_file_use_case_1 = require("./use-cases/upload-file-use-case");
const typeorm_1 = require("@nestjs/typeorm");
const persona_entity_1 = require("./entities/persona.entity");
const typeorm_2 = require("typeorm");
const create_empoloyee_use_case_1 = require("./use-cases/create-empoloyee-use-case");
const assign_skills_use_case_1 = require("./use-cases/assign-skills-use-case");
const skill_entity_1 = require("./entities/skill.entity");
const create_skill_use_case_1 = require("./use-cases/create-skill-use-case");
const idioma_entity_1 = require("./entities/idioma.entity");
const create_language_use_case_1 = require("./use-cases/create-language-use-case");
const assign_language_use_case_1 = require("./use-cases/assign-language-use-case");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const fs_1 = require("fs");
const path_1 = require("path");
let AtGptDatabaseService = class AtGptDatabaseService {
    constructor(personaRepository, skillRepository, languageRepository) {
        this.personaRepository = personaRepository;
        this.skillRepository = skillRepository;
        this.languageRepository = languageRepository;
    }
    async onModuleInit() {
        this.llm = new openai_1.ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
            modelName: 'gpt-4o'
        });
    }
    async uploadFile(file) {
        const extract = await (0, upload_file_use_case_1.uploadFileUseCase)(file, this.llm);
        console.log('extract', extract);
        try {
            const persona = await (0, create_empoloyee_use_case_1.createEmployeeUseCase)(this.personaRepository, {
                nombre: extract.name,
                apellidos: extract.lastName,
                email: extract.email,
                telefono: extract.phone ? extract.phone : 'No disponible'
            });
            const skills = extract.skills.technical.map((skill) => ({
                nombre: skill,
                nivel: 'medio',
                etiquetas: 'tech'
            }));
            for (const skill of skills) {
                const dbSkill = await (0, create_skill_use_case_1.createSkillUseCase)(this.skillRepository, skill);
                await (0, assign_skills_use_case_1.assignSkillToPersonUseCase)(this.personaRepository, dbSkill, persona.email);
            }
            const languages = extract.languages.map((language) => ({
                idioma: language.name,
                nivel: language.level
            }));
            for (const language of languages) {
                const dbLanguage = await (0, create_language_use_case_1.createLanguageUseCase)(this.languageRepository, language);
                await (0, assign_language_use_case_1.assignLanguageToPersonUseCase)(this.personaRepository, dbLanguage, persona.email);
            }
            return persona;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllPeople() {
        return this.personaRepository.find();
    }
    async generatePdf(idPersona) {
        const persona = await this.personaRepository.findOne({
            where: { id_persona: idPersona },
            relations: ['idiomas', 'skills']
        });
        if (!persona) {
            throw new Error('Persona not found');
        }
        console.log('persona', persona);
        const templateHtml = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'template-cv.hbs'), 'utf8');
        console.log('template', templateHtml);
        const template = Handlebars.compile(templateHtml);
        const data = {
            nombre: persona.nombre,
            apellido: persona.apellidos,
            email: persona.email,
            initials: persona.nombre.charAt(0) + persona.apellidos.charAt(0),
            resumen: 'Resumen ejecutivo del usuario',
            experiencia: [
                {
                    cliente: 'Cliente XXX',
                    proyecto: 'Proyecto XXX',
                    funciones: 'Aquí estan descritas las funciones XXX del soci@',
                    herramientas: 'XXX, XXX'
                }
            ],
            skills: persona.skills.map((skill) => skill.nombre),
            idiomas: persona.idiomas.map((idioma) => idioma.idioma)
        };
        const html = template(data);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();
        return pdf;
    }
};
exports.AtGptDatabaseService = AtGptDatabaseService;
exports.AtGptDatabaseService = AtGptDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(persona_entity_1.Persona)),
    __param(1, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __param(2, (0, typeorm_1.InjectRepository)(idioma_entity_1.Idioma)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AtGptDatabaseService);
//# sourceMappingURL=at-gpt-database.service.js.map