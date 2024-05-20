import {Repository} from 'typeorm'
import {Persona} from '../entities/persona.entity'

interface Options {
  nombre: string
  apellidos: string
  email: string
  telefono: string
  summary: string
}

export const createEmployeeUseCase = async (
  personaRepository: Repository<Persona>,
  persona: Options
) => {
  const {email, nombre, apellidos, telefono, summary} = persona

  const existingPersona = await personaRepository.findOne({where: {email}})

  if (existingPersona) {
    throw new Error('La persona ya existe en la base de datos')
  }

  return await personaRepository.save({
    nombre,
    apellidos,
    email,
    telefono,
    summary
  })
}
