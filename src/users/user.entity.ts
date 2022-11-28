import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  
  @Column()
  password: string;

  // Hooks
  @AfterInsert()
  logInsert() {
    console.log(`Aggiunto un utente con id: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Modificato utente con id: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Rimosso utente con id: ${this.id}`)
  }
}