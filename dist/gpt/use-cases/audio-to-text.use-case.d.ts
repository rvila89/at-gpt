/// <reference types="multer" />
import OpenAI from 'openai';
interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}
export declare const audioToTextUseCase: (openai: OpenAI, options: Options) => Promise<OpenAI.Audio.Transcriptions.Transcription>;
export {};
