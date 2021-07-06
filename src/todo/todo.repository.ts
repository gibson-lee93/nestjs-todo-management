import { Repository, EntityRepository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoStatus } from './todo-status.enum';
import { User } from '../auth/user.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getTodo(filterDto: GetTodoFilterDto, user: User): Promise<Todo[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('todo');
    query.where({ user });

    if(status) {
      query.andWhere('todo.status = :status', { status });
    }

    if(search) {
      query.andWhere(
        '(LOWER(todo.title) LIKE LOWER(:search) OR LOWER(todo.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const todo = await query.getMany();
    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, description } = createTodoDto;

    const todo = this.create({
      title,
      description,
      status: TodoStatus.OPEN,
      user,
    });

    await this.save(todo);
    return todo;
  }
}
