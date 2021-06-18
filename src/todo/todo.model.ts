export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
