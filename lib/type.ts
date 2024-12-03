export interface SquareButtonProps {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

export interface TodoItemProps {
  id: string;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export interface ITodoItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface FetchTodosResponse {
  items: TodoItemProps[];
}

export interface CreateTodoDto {
  name: string;
}

export interface UpdateTodoDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface UploadImageResponse {
  imageUrl: string;
}
