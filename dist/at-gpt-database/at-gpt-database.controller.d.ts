/// <reference types="multer" />
import { AtGptDatabaseService } from './at-gpt-database.service';
import { Persona } from './entities/persona.entity';
import type { Response } from 'express';
export declare class AtGptDatabaseController {
    private readonly atGptDatabaseService;
    constructor(atGptDatabaseService: AtGptDatabaseService);
    uploadPdf(file: Express.Multer.File): Promise<{
        nombre: string;
        apellidos: string;
        email: string;
        telefono: string;
    } & Persona>;
    findAll(): Promise<Persona[]>;
    generatePdf(res: Response, idPersona: string): Promise<void>;
}
