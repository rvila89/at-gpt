"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageGenerationUseCase = void 0;
const helpers_1 = require("../../helpers");
const imageGenerationUseCase = async (openai, options) => {
    const { prompt, originalImage, maskImage } = options;
    const response = await openai.images.generate({
        prompt: prompt,
        model: 'dall-e-3',
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        response_format: 'url'
    });
    await (0, helpers_1.downloadImageAsPng)(response.data[0].url);
    console.log(response);
    return {
        url: response.data[0].url,
        localPath: '',
        revised_prompt: response.data[0].revised_prompt
    };
};
exports.imageGenerationUseCase = imageGenerationUseCase;
//# sourceMappingURL=image-generation.use-case.js.map