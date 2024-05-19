"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignLanguageToPersonUseCase = void 0;
const assignLanguageToPersonUseCase = async (personaRepository, idioma, email) => {
    const persona = await personaRepository.findOne({
        where: { email },
        relations: ['idiomas']
    });
    if (!persona) {
        throw new Error('Persona no encontrada');
    }
    persona.idiomas = persona.idiomas ?? [];
    persona.idiomas.push(idioma);
    return await personaRepository.save(persona);
};
exports.assignLanguageToPersonUseCase = assignLanguageToPersonUseCase;
//# sourceMappingURL=assign-language-use-case.js.map