"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeUseCase = void 0;
const createEmployeeUseCase = async (personaRepository, persona) => {
    const { email, nombre, apellidos, telefono } = persona;
    const existingPersona = await personaRepository.findOne({ where: { email } });
    if (existingPersona) {
        throw new Error('La persona ya existe en la base de datos');
    }
    return await personaRepository.save({
        nombre,
        apellidos,
        email,
        telefono
    });
};
exports.createEmployeeUseCase = createEmployeeUseCase;
//# sourceMappingURL=create-empoloyee-use-case.js.map