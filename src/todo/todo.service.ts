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
  
  // createTodo(createTodoDto: CreateTodoDto): Todo {
  //   const { title, description } = createTodoDto;
  //
  //   const todo: Todo = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status:TodoStatus.OPEN,
  //   };
  //
  //   this.todo.push(todo);
  //   return todo;
  // }
  //
  // deleteTodo(id: string): void {
  //   const found = this.getTodoById(id);
  //   this.todo = this.todo.filter((todo) => todo.id !== id);
  // }
  //
  // updateTodoStatus(id: string, status: TodoStatus): Todo {
  //   const todo = this.getTodoById(id);
  //   todo.status = status;
  //   return todo;
  // }
}
