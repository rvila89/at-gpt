/// <reference types="multer" />
import { AudioToTextDTO, ImageGenerationDTO, OrtographyDTO, ProsConsDiscusserDTO, TextToAudioDTO, TranslateDTO } from './dtos';
import type { Response } from 'express';
import { GptService } from './gpt.service';
export declare class GptController {
    private readonly gptService;
    constructor(gptService: GptService);
    orthographyCheck(orthograpyDTO: OrtographyDTO): Promise<any>;
    prosConsDiscusser(prosConsDiscusserDTO: ProsConsDiscusserDTO): Promise<import("openai/resources").ChatCompletionMessage>;
    prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDTO, res: Response): Promise<void>;
    traslate(translateDTO: TranslateDTO): Promise<{
        message: string;
    }>;
    textToAudio(textToAudioDTO: TextToAudioDTO, res: Response): Promise<void>;
    textToAudioGetter(res: Response, fileId: string): Promise<void>;
    audioToText(file: Express.Multer.File, audioToTextDTO: AudioToTextDTO): Promise<import("openai/resources/audio/transcriptions").Transcription>;
    imageGeneration(imageGenerationDTO: ImageGenerationDTO): Promise<{
        url: string;
        localPath: string;
        revised_prompt: string;
    }>;
    getGeneratedImage(res: Response, fileName: string): Promise<void>;
}
