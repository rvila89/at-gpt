/// <reference types="multer" />
import { AudioToTextDTO, ImageGenerationDTO, OrtographyDTO, ProsConsDiscusserDTO, TextToAudioDTO, TranslateDTO } from './dtos';
import OpenAI from 'openai';
export declare class GptService {
    private openai;
    orthographyCheck(orthographyDTO: OrtographyDTO): Promise<any>;
    prosConsDiscusser(prosConsDiscusser: ProsConsDiscusserDTO): Promise<OpenAI.Chat.Completions.ChatCompletionMessage>;
    prosConsDiscusserStream(prosConsDiscusser: ProsConsDiscusserDTO): Promise<import("openai/streaming").Stream<OpenAI.Chat.Completions.ChatCompletionChunk>>;
    translate(translate: TranslateDTO): Promise<{
        message: string;
    }>;
    textToAudio({ prompt, voice }: TextToAudioDTO): Promise<string>;
    textToAudioGetter(fileId: string): Promise<string>;
    audioToText(audioFile: Express.Multer.File, audioToTextDTO: AudioToTextDTO): Promise<OpenAI.Audio.Transcriptions.Transcription>;
    imageGeneration(imageGenerationDTO: ImageGenerationDTO): Promise<{
        url: string;
        localPath: string;
        revised_prompt: string;
    }>;
    getGeneratedImage(fileId: string): Promise<string>;
}
