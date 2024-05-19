import { Repository } from 'typeorm';
import { Idioma } from '../entities/idioma.entity';
interface LanguageType {
    idioma: string;
    nivel: string;
}
export declare const createLanguageUseCase: (languageRepository: Repository<Idioma>, language: LanguageType) => Promise<Idioma>;
export {};
