import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string
  
  @Column()
  @Exclude()
  password: string

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