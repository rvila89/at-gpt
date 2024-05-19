import { AtGptAssistantService } from './at-gpt-assistant.service';
import { QuestionDto } from './dtos/question.dto';
export declare class AtGptAssistantController {
    private readonly atGptAssistantService;
    constructor(atGptAssistantService: AtGptAssistantService);
    createThread(): Promise<{
        id: string;
    }>;
    userQuestion(questionDto: QuestionDto): Promise<{
        role: "user" | "assistant";
        content: any[];
    }[]>;
}
