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
exports.Educacion = void 0;
const typeorm_1 = require("typeorm");
const persona_entity_1 = require("./persona.entity");
let Educacion = class Educacion {
};
exports.Educacion = Educacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Educacion.prototype, "id_educacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Educacion.prototype, "id_persona_fk", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], Educacion.prototype, "institucion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Educacion.prototype, "fechaini", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Educacion.prototype, "fechafin", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Educacion.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], Educacion.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => persona_entity_1.Persona, (persona) => persona.educaciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_persona_fk' }),
    __metadata("design:type", persona_entity_1.Persona)
], Educacion.prototype, "persona", void 0);
exports.Educacion = Educacion = __decorate([
    (0, typeorm_1.Entity)()
], Educacion);
//# sourceMappingURL=educacion.entity.js.map