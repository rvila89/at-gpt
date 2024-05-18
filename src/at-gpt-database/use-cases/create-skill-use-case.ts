import {Repository} from 'typeorm'
import {Skill} from '../entities/skill.entity'

interface SkillType {
  nombre: string
  nivel: string
  etiquetas: string
}

export const createSkillUseCase = async (
  skillRepository: Repository<Skill>,
  skill: SkillType
) => {
  const {nombre, nivel, etiquetas} = skill
  const existingSkill = await skillRepository.findOne({where: {nombre}})
  if (existingSkill) return existingSkill
  return await skillRepository.save({
    nombre,
    nivel,
    etiquetas
  })
}
