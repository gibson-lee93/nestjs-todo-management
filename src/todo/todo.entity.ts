import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoStatus } from './todo-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @ManyToOne(_type => User, (user) => user.todos, { eager: false })
  user: User;
}
