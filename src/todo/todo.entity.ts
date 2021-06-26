import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TodoStatus } from './todo-status.enum';

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
