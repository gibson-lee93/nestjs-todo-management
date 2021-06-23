import { IsEnum, IsString, IsOptional } from 'class-validator';
import { TodoStatus } from '../todo.model';

export class GetTodoFilterDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
