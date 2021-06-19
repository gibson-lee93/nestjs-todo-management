import { Injectable } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { v4 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';

@Injectable()
export class TodoService {
  private todo: Todo[] = [];

  getAllTodo(): Todo[] {
    return this.todo;
  }

  getTodoWithFilters(filterDto: GetTodoFilterDto): Todo[] {
    const { status, search } = filterDto;

    let todo = this.getAllTodo();

    if(status) {
      todo = todo.filter((todo) => todo.status === status);
    }

    if(search) {
      todo = todo.filter((todo) => {
        if(todo.title.includes(search) || todo.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return todo;
  }

  getTodoById(id: string): Todo {
    return this.todo.find((todo) => todo.id === id);
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    const { title, description } = createTodoDto;

    const todo: Todo = {
      id: uuid(),
      title,
      description,
      status:TodoStatus.OPEN,
    };

    this.todo.push(todo);
    return todo;
  }

  deleteTodo(id: string): void {
    this.todo = this.todo.filter((todo) => todo.id !== id);
  }

  updateTodoStatus(id: string, status: TodoStatus): Todo {
    const todo = this.getTodoById(id);
    todo.status = status;
    return todo;
  }
}
