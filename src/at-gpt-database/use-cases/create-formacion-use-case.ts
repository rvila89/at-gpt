import {Repository} from 'typeorm'
import {Educacion} from '../entities/educacion.entity'

interface FormacionOptions {
  institucion: string
  fechafin?: Date
  tipo: string
  personaId: number
}

export const createFormacionUseCase = async (
  educacionRepository: Repository<Educacion>,
  formacion: FormacionOptions
) => {
  const newFormacion = educacionRepository.create({
    institucion: formacion.institucion,
    fechaini: new Date(),
    fechafin: formacion.fechafin,
    area: 'General',
    tipo: formacion.tipo,
    persona: {id_persona: formacion.personaId}
  })

  return await educacionRepository.save(newFormacion)
}
