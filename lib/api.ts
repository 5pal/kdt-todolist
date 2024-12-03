import {
  CreateTodoDto,
  FetchTodosResponse,
  ITodoItem,
  TodoItemProps,
  UpdateTodoDto,
} from "./type";

const API_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "5pal";

// export const fetchTodos = async (): Promise<ITodoItem[]> => {
//   const response = await fetch(`${API_URL}/${TENANT_ID}/items`);

//   if (!response.ok) {
//     throw new Error(`Failed to fetch todos: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data;
// };

export const fetchTodos = async (): Promise<ITodoItem[]> => {
  const response = await fetch(`${API_URL}/${TENANT_ID}/items`, {
    cache: "no-store", // 항상 최신 데이터 가져오기
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }

  const data: ITodoItem[] = await response.json();
  return data;
};

// 특정 할 일 조회
export const fetchTodoById = async (id: string): Promise<TodoItemProps> => {
  console.log(id);
  const response = await fetch(`${API_URL}/${TENANT_ID}/items/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch todo: ${response.statusText}`);
  }
  return response.json();
};

export const createTodo = async (
  data: CreateTodoDto,
): Promise<TodoItemProps> => {
  const response = await fetch(`${API_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: data.name }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`);
  }

  return response.json();
};

export const updateTodo = async (
  id: string,
  data: UpdateTodoDto,
): Promise<UpdateTodoDto> => {
  const response = await fetch(`${API_URL}/${TENANT_ID}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted: data.isCompleted, memo: data.memo }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${TENANT_ID}/items/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to delete todo: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
