import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodo(): Todo[] {
    return this.todoService.getAllTodo();
  }

  @Post()
  createTodo(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Todo {
    return this.todoService.createTodo(title, description);
  }
}
