import { Repository } from 'typeorm';
import { Skill } from '../entities/skill.entity';
interface SkillType {
    nombre: string;
    nivel: string;
    etiquetas: string;
}
export declare const createSkillUseCase: (skillRepository: Repository<Skill>, skill: SkillType) => Promise<Skill>;
export {};
