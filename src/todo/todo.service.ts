import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  getTodo(filterDto: GetTodoFilterDto, user: User): Promise<Todo[]> {
    return this.todoRepository.getTodo(filterDto, user);
  }

  async getTodoById(id: string, user: User): Promise<Todo> {
    const found = await this.todoRepository.findOne({ id, user });

    if(!found) {
      throw new NotFoundException(`Todo with ID:${id} not found`);
    }

    return found;
  }

  createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  async deleteTodo(id: string, user: User): Promise<void> {
    const result = await this.todoRepository.delete({ id, user });

    if(result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTodoStatus(
    id: string,
    status: TodoStatus,
    user: User,
  ): Promise<Todo> {
    const todo = await this.getTodoById(id, user);

    todo.status = status;
    this.todoRepository.save(todo);

    return todo;
  }
}
