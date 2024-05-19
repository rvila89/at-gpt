import { Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';
interface Options {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
}
export declare const createEmployeeUseCase: (personaRepository: Repository<Persona>, persona: Options) => Promise<{
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
} & Persona>;
export {};
