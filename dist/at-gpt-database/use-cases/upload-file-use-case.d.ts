/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
import { ChatOpenAI } from '@langchain/openai';
export declare const uploadFileUseCase: (file: Express.Multer.File, llm: ChatOpenAI) => Promise<{
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
