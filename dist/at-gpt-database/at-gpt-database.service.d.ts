/// <reference types="multer" />
/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { Idioma } from './entities/idioma.entity';
export declare class AtGptDatabaseService implements OnModuleInit {
    private personaRepository;
    private skillRepository;
    private languageRepository;
    private llm;
    constructor(personaRepository: Repository<Persona>, skillRepository: Repository<Skill>, languageRepository: Repository<Idioma>);
    onModuleInit(): Promise<void>;
    uploadFile(file: Express.Multer.File): Promise<{
        nombre: string;
        apellidos: string;
        email: string;
        telefono: string;
    } & Persona>;
    findAllPeople(): Promise<Persona[]>;
    generatePdf(idPersona: number): Promise<Buffer>;
}
