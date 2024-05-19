"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguageUseCase = void 0;
const createLanguageUseCase = async (languageRepository, language) => {
    const { idioma, nivel } = language;
    const existingLanguage = await languageRepository.findOne({
        where: { idioma, nivel }
    });
    if (existingLanguage)
        return existingLanguage;
    return await languageRepository.save({
        idioma,
        nivel
    });
};
exports.createLanguageUseCase = createLanguageUseCase;
//# sourceMappingURL=create-language-use-case.js.map