"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const at_gpt_chat_module_1 = require("./at-gpt-chat/at-gpt-chat.module");
const at_gpt_database_module_1 = require("./at-gpt-database/at-gpt-database.module");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const fs = require("fs");
const persona_entity_1 = require("./at-gpt-database/entities/persona.entity");
const educacion_entity_1 = require("./at-gpt-database/entities/educacion.entity");
const idioma_entity_1 = require("./at-gpt-database/entities/idioma.entity");
const skill_entity_1 = require("./at-gpt-database/entities/skill.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => {
                    const srcPath = (0, path_1.join)(__dirname, 'data', 'atdb03_bck.db');
                    const destPath = '/tmp/atdb03_bck.db';
                    if (!fs.existsSync(destPath)) {
                        fs.mkdirSync('/tmp', { recursive: true });
                        fs.copyFileSync(srcPath, destPath);
                    }
                    return {
                        type: 'sqlite',
                        database: destPath,
                        entities: [persona_entity_1.Persona, educacion_entity_1.Educacion, idioma_entity_1.Idioma, skill_entity_1.Skill],
                        synchronize: true
                    };
                }
            }),
            at_gpt_chat_module_1.AtGptChatModule,
            at_gpt_database_module_1.AtGptDatabaseModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map