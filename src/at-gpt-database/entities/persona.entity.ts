import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable
} from 'typeorm'
import {Idioma} from './idioma.entity'
import {Skill} from './skill.entity'
import {Educacion} from './educacion.entity' // Importa la entidad Educacion
import {Trabajo} from './trabajo.entity'

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id_persona: number

  @Column({length: 40})
  nombre: string

  @Column({length: 100})
  apellidos: string

  @Column({length: 40})
  email: string

  @Column({length: 15})
  telefono: string

  @Column({length: 500, nullable: true})
  summary: string

  @OneToMany(() => Educacion, (educacion) => educacion.persona)
  educaciones: Educacion[]
  @OneToMany(() => Trabajo, (trabajo) => trabajo.persona)
  trabajos: Trabajo[]

  @ManyToMany(() => Idioma, (idioma) => idioma.persona)
  @JoinTable({
    name: 'idioma_persona',
    joinColumn: {name: 'id_persona_fk', referencedColumnName: 'id_persona'},
    inverseJoinColumn: {
      name: 'id_idioma_fk',
      referencedColumnName: 'id_idioma'
    }
  })
  idiomas: Idioma[]

  @ManyToMany(() => Skill, (skill) => skill.persona)
  @JoinTable({
    name: 'skill_persona',
    joinColumn: {name: 'id_persona_fk', referencedColumnName: 'id_persona'},
    inverseJoinColumn: {name: 'id_skill_fk', referencedColumnName: 'id_skill'}
  }) // Especifica el nombre de la tabla intermedia
  skills: Skill[]
}
