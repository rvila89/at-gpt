"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSkillUseCase = void 0;
const createSkillUseCase = async (skillRepository, skill) => {
    const { nombre, nivel, etiquetas } = skill;
    const existingSkill = await skillRepository.findOne({ where: { nombre } });
    if (existingSkill)
        return existingSkill;
    return await skillRepository.save({
        nombre,
        nivel,
        etiquetas
    });
};
exports.createSkillUseCase = createSkillUseCase;
//# sourceMappingURL=create-skill-use-case.js.map