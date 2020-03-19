import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'

import {User} from './User'
@Entity()
export class Note {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @CreateDateColumn({type: 'datetime'})
  created_at: Date;

  @UpdateDateColumn({type: 'datetime'})
  updated_at: Date;

  @ManyToOne(type=> User, user => user.notes)
  user: User;
}