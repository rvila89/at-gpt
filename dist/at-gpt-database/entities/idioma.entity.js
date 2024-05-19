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
exports.Idioma = void 0;
const typeorm_1 = require("typeorm");
const persona_entity_1 = require("./persona.entity");
let Idioma = class Idioma {
};
exports.Idioma = Idioma;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Idioma.prototype, "id_idioma", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30 }),
    __metadata("design:type", String)
], Idioma.prototype, "idioma", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], Idioma.prototype, "nivel", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => persona_entity_1.Persona, (persona) => persona.idiomas),
    __metadata("design:type", Array)
], Idioma.prototype, "persona", void 0);
exports.Idioma = Idioma = __decorate([
    (0, typeorm_1.Entity)()
], Idioma);
//# sourceMappingURL=idioma.entity.js.map