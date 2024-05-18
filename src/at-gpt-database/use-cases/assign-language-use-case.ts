import {Repository} from 'typeorm'
import {Persona} from '../entities/persona.entity'

export const assignLanguageToPersonUseCase = async (
  personaRepository: Repository<Persona>,
  idioma,
  email: string
) => {
  const persona = await personaRepository.findOne({
    where: {email},
    relations: ['idiomas']
  })
  if (!persona) {
    throw new Error('Persona no encontrada')
  }

  persona.idiomas = persona.idiomas ?? []
  persona.idiomas.push(idioma)

  return await personaRepository.save(persona)
}
