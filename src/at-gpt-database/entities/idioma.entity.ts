import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm'
import {Persona} from './persona.entity'

@Entity()
export class Idioma {
  @PrimaryGeneratedColumn()
  id_idioma: number

  @Column({length: 30})
  idioma: string

  @Column({length: 20})
  nivel: string

  @ManyToMany(() => Persona, (persona) => persona.idiomas)
  persona: Persona[]
}
