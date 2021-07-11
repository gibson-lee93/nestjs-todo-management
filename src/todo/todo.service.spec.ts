import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { TodoStatus } from './todo-status.enum';

const mockTodoRepository = () => ({
  getTodo: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Gibson',
  id: 'someId',
  password: 'password',
  todos: [],
}

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: TodoRepository, useFactory: mockTodoRepository },
      ],
    }).compile();

    todoService = module.get(TodoService);
    todoRepository = module.get(TodoRepository);
  });

  describe('getTodo', () => {
    it('calls todoRepository.getTodo and returns the result', async () => {
      todoRepository.getTodo.mockResolvedValue('someValue');
      const result = await todoService.getTodo(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTodoById', () => {
    it('calls TodoRepository.findOne and returns the result', async () => {
      const mockTodo = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: TodoStatus.OPEN,
      };

      todoRepository.findOne.mockResolvedValue(mockTodo);
      const result = await todoService.getTodoById('someId', mockUser);
      expect(result).toEqual(mockTodo);
    });

    it('calls TodoRepository.findOne and handles the error', async () => {
      todoRepository.findOne.mockResolvedValue(null);
      expect(todoService.getTodoById('someId', mockUser)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
