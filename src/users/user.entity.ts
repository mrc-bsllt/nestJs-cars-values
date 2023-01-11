import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { Report } from '../reports/report.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string
  
  @Column()
  @Exclude()
  password: string

  @OneToMany(
    () => Report, 
    (report) => report.user
  )
  reports: Report[]

  // Hooks
  @AfterInsert()
  logInsert() {
    console.log(`Aggiunto un utente con id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Modificato utente con id: ${this.id}`)
  }

  @BeforeRemove()
  logRemove() {
    console.log(`Rimosso utente con id: ${this.id}`)
  }
}