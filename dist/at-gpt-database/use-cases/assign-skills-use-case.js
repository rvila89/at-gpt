"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignSkillToPersonUseCase = void 0;
const assignSkillToPersonUseCase = async (personaRepository, skill, email) => {
    const persona = await personaRepository.findOne({
        where: { email },
        relations: ['skills']
    });
    if (!persona) {
        throw new Error('Persona no encontrada');
    }
    persona.skills = persona.skills ?? [];
    persona.skills.push(skill);
    return await personaRepository.save(persona);
};
exports.assignSkillToPersonUseCase = assignSkillToPersonUseCase;
//# sourceMappingURL=assign-skills-use-case.js.map