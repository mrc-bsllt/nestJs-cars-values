import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column()
  make: string

  @Column()
  model: string

  @Column()
  lng: number

  @Column()
  lat: number

  @Column()
  year: number

  @Column()
  mileage: number

  @ManyToOne(
    () => User,
    (user) => user.reports
  )
  user: User
}