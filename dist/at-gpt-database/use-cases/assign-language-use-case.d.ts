import { Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';
export declare const assignLanguageToPersonUseCase: (personaRepository: Repository<Persona>, idioma: any, email: string) => Promise<Persona>;
