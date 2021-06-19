import { Injectable } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import { v4 as uuid } from 'uuid';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  private todo: Todo[] = [];

  getAllTodo(): Todo[] {
    return this.todo;
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
}
