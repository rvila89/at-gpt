import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm'
import {Persona} from './persona.entity'

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id_skill: number

  @Column({length: 60})
  nombre: string

  @Column({length: 30})
  nivel: string

  @Column({length: 300})
  etiquetas: string

  @ManyToMany(() => Persona, (persona) => persona.skills)
  persona: Persona[]
}
