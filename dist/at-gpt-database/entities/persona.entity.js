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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
const typeorm_1 = require("typeorm");
const idioma_entity_1 = require("./idioma.entity");
const skill_entity_1 = require("./skill.entity");
const educacion_entity_1 = require("./educacion.entity");
let Persona = class Persona {
};
exports.Persona = Persona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Persona.prototype, "id_persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40 }),
    __metadata("design:type", String)
], Persona.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Persona.prototype, "apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 40 }),
    __metadata("design:type", String)
], Persona.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], Persona.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => educacion_entity_1.Educacion, (educacion) => educacion.persona),
    __metadata("design:type", Array)
], Persona.prototype, "educaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => idioma_entity_1.Idioma, (idioma) => idioma.persona),
    (0, typeorm_1.JoinTable)({
        name: 'idioma_persona',
        joinColumn: { name: 'id_persona_fk', referencedColumnName: 'id_persona' },
        inverseJoinColumn: {
            name: 'id_idioma_fk',
            referencedColumnName: 'id_idioma'
        }
    }),
    __metadata("design:type", Array)
], Persona.prototype, "idiomas", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => skill_entity_1.Skill, (skill) => skill.persona),
    (0, typeorm_1.JoinTable)({
        name: 'skill_persona',
        joinColumn: { name: 'id_persona_fk', referencedColumnName: 'id_persona' },
        inverseJoinColumn: { name: 'id_skill_fk', referencedColumnName: 'id_skill' }
    }),
    __metadata("design:type", Array)
], Persona.prototype, "skills", void 0);
exports.Persona = Persona = __decorate([
    (0, typeorm_1.Entity)()
], Persona);
//# sourceMappingURL=persona.entity.js.map