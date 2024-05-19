"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGptDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const at_gpt_database_controller_1 = require("./at-gpt-database.controller");
const at_gpt_database_service_1 = require("./at-gpt-database.service");
const typeorm_1 = require("@nestjs/typeorm");
const persona_entity_1 = require("./entities/persona.entity");
const educacion_entity_1 = require("./entities/educacion.entity");
const idioma_entity_1 = require("./entities/idioma.entity");
const skill_entity_1 = require("./entities/skill.entity");
let AtGptDatabaseModule = class AtGptDatabaseModule {
};
exports.AtGptDatabaseModule = AtGptDatabaseModule;
exports.AtGptDatabaseModule = AtGptDatabaseModule = __decorate([
    (0, common_1.Module)({
        controllers: [at_gpt_database_controller_1.AtGptDatabaseController],
        providers: [at_gpt_database_service_1.AtGptDatabaseService],
        imports: [typeorm_1.TypeOrmModule.forFeature([persona_entity_1.Persona, educacion_entity_1.Educacion, idioma_entity_1.Idioma, skill_entity_1.Skill])]
    })
], AtGptDatabaseModule);
//# sourceMappingURL=at-gpt-database.module.js.map