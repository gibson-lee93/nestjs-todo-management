import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodo(): Todo[] {
    return this.todoService.getAllTodo();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.createTodo(createTodoDto);
  }
}
