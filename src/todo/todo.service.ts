import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoStatus } from './todo-status.enum';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}
  // getAllTodo(): Todo[] {
  //   return this.todo;
  // }
  //
  // getTodoWithFilters(filterDto: GetTodoFilterDto): Todo[] {
  //   const { status, search } = filterDto;
  //
  //   let todo = this.getAllTodo();
  //
  //   if(status) {
  //     todo = todo.filter((todo) => todo.status === status);
  //   }
  //
  //   if(search) {
  //     todo = todo.filter((todo) => {
  //       if(todo.title.includes(search) || todo.description.includes(search)) {
  //         return true;
  //       }
  //
  //       return false;
  //     });
  //   }
  //
  //   return todo;
  // }
  //

  async getTodoById(id: string): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Todo with ID:${id} not found`);
    }

    return found;
  }

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto);
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);

    if(result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTodoStatus(id: string, status: TodoStatus): Promise<Todo> {
    const todo = await this.getTodoById(id);

    todo.status = status;
    this.todoRepository.save(todo);
    
    return todo;
  }
}
