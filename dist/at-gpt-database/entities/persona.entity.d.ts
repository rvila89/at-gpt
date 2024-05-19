import { Idioma } from './idioma.entity';
import { Skill } from './skill.entity';
import { Educacion } from './educacion.entity';
export declare class Persona {
    id_persona: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    educaciones: Educacion[];
    idiomas: Idioma[];
    skills: Skill[];
}
