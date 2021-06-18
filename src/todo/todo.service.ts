import { Injectable } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TodoService {
  private todo: Todo[] = [];

  getAllTodo(): Todo[] {
    return this.todo;
  }

  createTodo(title: string, description: string): Todo {
    const todo: Todo = {
      id: uuid(),
      title,
      description,
      status:TodoStatus.OPEN,
    };

    this.todo.push(todo);
    return todo;
  }
}
