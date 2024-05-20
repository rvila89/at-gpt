import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import {Persona} from './persona.entity'

@Entity()
export class Trabajo {
  @PrimaryGeneratedColumn()
  id_trabajo: number

  @Column({length: 40})
  empresa: string

  @Column({type: 'date'})
  fechaini: Date

  @Column({type: 'date'})
  fechafin: Date

  @Column({length: 30})
  cargo: string

  @Column({length: 500})
  resumen: string

  @ManyToOne(() => Persona, (persona) => persona.trabajos)
  @JoinColumn({name: 'id_persona_fk'})
  persona: Persona
}
