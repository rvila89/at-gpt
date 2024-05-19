/// <reference types="multer" />
import { LangchainChatService } from './langchain-chat.service';
export declare class LangchainChatController {
    private readonly langchainChatService;
    constructor(langchainChatService: LangchainChatService);
    chat(prompt: string): Promise<{
        success: boolean;
        data?: string;
        messageError?: string;
    }>;
    uploadPdf(file: Express.Multer.File): Promise<{
        summary?: string;
        name?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        company?: string;
        skills?: {
            technical?: string[];
            soft?: string[];
        };
        professional_experience?: {
            company?: string;
            position?: string;
            dateStart?: string;
            dateEnd?: string;
            client?: string;
            projects?: {
                description?: string;
                name?: string;
                date?: string;
                technologies_tools?: string[];
            }[];
            skills?: string[];
            methodology?: string[];
        }[];
        education?: {
            degree?: string;
            institution?: string;
            year?: string;
        }[];
        languages?: {
            name?: string;
            level?: string;
        }[];
    }>;
}
