import { Repository, EntityRepository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoStatus } from './todo-status.enum';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  private logger = new Logger('TodoRepository', true);

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

    try{
      const todo = await query.getMany();
      return todo;
    } catch (error) {
      this.logger.error(`Failed to get todos for user "${
        user.username
      }". Filters: ${JSON.stringify(filterDto)}`,
      error.stack,
    );
      throw new InternalServerErrorException();
    }
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
