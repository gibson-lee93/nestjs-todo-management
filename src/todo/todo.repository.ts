import { Repository, EntityRepository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './todo-status.enum';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description } = createTodoDto;

    const todo = this.create({
      title,
      description,
      status: TodoStatus.OPEN,
    });

    await this.save(todo);
    return todo;
  }
}
