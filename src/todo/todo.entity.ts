import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TodoStatus } from './todo.model';

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
}
