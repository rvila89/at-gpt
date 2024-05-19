/// <reference types="multer" />
import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class LangchainChatService implements OnModuleInit {
    private sqliteDataSource;
    private agent_db_executor;
    private openai;
    private toolkit;
    private llm;
    constructor(sqliteDataSource: DataSource);
    onModuleInit(): Promise<void>;
    chat(prompt: string): Promise<any>;
    uploadFile(file: Express.Multer.File): Promise<{
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
