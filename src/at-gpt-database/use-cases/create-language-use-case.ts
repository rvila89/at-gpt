import {Repository} from 'typeorm'
import {Idioma} from '../entities/idioma.entity'

interface LanguageType {
  idioma: string
  nivel: string
}

export const createLanguageUseCase = async (
  languageRepository: Repository<Idioma>,
  language: LanguageType
) => {
  const {idioma, nivel} = language
  const existingLanguage = await languageRepository.findOne({
    where: {idioma, nivel}
  })
  if (existingLanguage) return existingLanguage
  return await languageRepository.save({
    idioma,
    nivel
  })
}
