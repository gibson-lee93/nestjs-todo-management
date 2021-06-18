import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private todo: Todo[] = [];

  getAllTodo(): Todo[] {
    return this.todo;
  }
}
