"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToAudioUseCase = void 0;
const path = require("path");
const fs = require("fs");
const textToAudioUseCase = async (openai, { prompt, voice }) => {
    const voices = {
        nova: 'nova',
        alloy: 'alloy',
        echo: 'echo',
        fable: 'fable',
        onyx: 'onyx',
        shimmer: 'shimmer'
    };
    const selectedVoice = voices[voice] ?? 'nova';
    const folderPath = path.resolve(__dirname, '../../../generated/audios');
    const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);
    fs.mkdirSync(folderPath, { recursive: true });
    const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3'
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.writeFileSync(speechFile, buffer);
    console.log(mp3);
    return speechFile;
};
exports.textToAudioUseCase = textToAudioUseCase;
//# sourceMappingURL=text-to-audio.use-case.js.map