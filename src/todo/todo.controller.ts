import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoStatus } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodo(@Query() filterDto: GetTodoFilterDto): Todo[] {
    if(Object.keys(filterDto).length) {
      return this.todoService.getTodoWithFilters(filterDto);
    } else {
      return this.todoService.getAllTodo();
    }
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string): void {
    return this.todoService.deleteTodo(id);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body('status') status: TodoStatus
  ): Todo {
    return this.todoService.updateTodoStatus(id, status);
  }
}
