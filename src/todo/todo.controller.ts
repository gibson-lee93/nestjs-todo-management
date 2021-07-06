import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  Logger,
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
  private logger = new Logger('TodoController');
  constructor(private todoService: TodoService) { }

  @Get()
  getTodo(
    @Query() filterDto: GetTodoFilterDto,
    @GetUser() user: User,
  ): Promise<Todo[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all todos. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.todoService.getTodo(filterDto, user);
  }

  @Get('/:id')
  getTodoById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Todo> {
    this.logger.verbose(
      `User "${user.username}" retrieving todo by id "${id}"`,
    );
    return this.todoService.getTodoById(id, user);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    this.logger.verbose(
      `User "${user.username}" creating a new todo. Data: ${JSON.stringify(
        createTodoDto
      )}`,
    );
    return this.todoService.createTodo(createTodoDto, user);
  }

  @Delete('/:id')
  deleteTodo(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a todo by id "${id}"`,
    );
    return this.todoService.deleteTodo(id, user);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body() updateTodoStatusDto: UpdateTodoStatusDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    this.logger.verbose(
      `User "${user.username}" updating a todo status by id "${id}". Status: ${
        JSON.stringify(updateTodoStatusDto)
      }`,
    );
    const { status } = updateTodoStatusDto;
    return this.todoService.updateTodoStatus(id, status, user);
  }
}
