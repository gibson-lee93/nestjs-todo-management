import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { Todo } from './todo.entity';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Get()
  getTodo(
    @Query() filterDto: GetTodoFilterDto,
    @GetUser() user: User,
  ): Promise<Todo[]> {
    return this.todoService.getTodo(filterDto, user);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteTodo(id);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body() updateTodoStatusDto: UpdateTodoStatusDto
  ): Promise<Todo> {
    const { status } = updateTodoStatusDto;
    return this.todoService.updateTodoStatus(id, status);
  }
}
