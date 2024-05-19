"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioToTextUseCase = void 0;
const fs = require("fs");
const audioToTextUseCase = async (openai, options) => {
    const { prompt, audioFile } = options;
    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFile.path),
        prompt: prompt,
        language: 'es',
        response_format: 'verbose_json'
    });
    console.log(response);
    return response;
};
exports.audioToTextUseCase = audioToTextUseCase;
//# sourceMappingURL=audio-to-text.use-case.js.map