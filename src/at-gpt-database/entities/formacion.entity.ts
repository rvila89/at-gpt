import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import {Persona} from './persona.entity'

@Entity()
export class Educacion {
  @PrimaryGeneratedColumn()
  id_educacion: number

  @Column({length: 80})
  institucion: string

  @Column({type: 'date'})
  fechaini: Date

  @Column({type: 'date', nullable: true})
  fechafin: Date

  @Column({length: 100})
  area: string

  @Column({length: 80})
  tipo: string

  @ManyToOne(() => Persona, (persona) => persona.educaciones)
  @JoinColumn({name: 'id_persona_fk'})
  persona: Persona
}
