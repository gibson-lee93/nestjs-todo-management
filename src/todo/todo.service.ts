import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todo = [];

  getAllTodo() {
    return this.todo;
  }
}
