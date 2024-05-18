import {Repository} from 'typeorm'
import {Persona} from '../entities/persona.entity'

export const assignSkillToPersonUseCase = async (
  personaRepository: Repository<Persona>,
  skill,
  email: string
) => {
  const persona = await personaRepository.findOne({
    where: {email},
    relations: ['skills']
  })
  if (!persona) {
    throw new Error('Persona no encontrada')
  }
  persona.skills = persona.skills ?? []
  persona.skills.push(skill)

  return await personaRepository.save(persona)
}
