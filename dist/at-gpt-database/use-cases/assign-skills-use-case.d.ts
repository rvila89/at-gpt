import { Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';
export declare const assignSkillToPersonUseCase: (personaRepository: Repository<Persona>, skill: any, email: string) => Promise<Persona>;
