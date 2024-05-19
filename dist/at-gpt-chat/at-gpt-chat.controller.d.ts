import { AtGptChatService } from './at-gpt-chat.service';
export declare class AtGptChatController {
    private readonly atGptChatService;
    constructor(atGptChatService: AtGptChatService);
    chat(prompt: string): Promise<{
        success: boolean;
        data?: string;
        messageError?: string;
    }>;
}
