import { Persona } from './persona.entity';
export declare class Educacion {
    id_educacion: number;
    id_persona_fk: number;
    institucion: string;
    fechaini: Date;
    fechafin: Date;
    area: string;
    tipo: string;
    persona: Persona;
}
