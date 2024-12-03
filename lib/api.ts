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
    body: JSON.stringify({
      isCompleted: data.isCompleted,
      memo: data.memo,
      imageUrl: data.imageUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
};

export const updateTodoImage = async (image: File): Promise<string> => {
  if (!image) {
    throw new Error("업로드할 이미지가 필요합니다.");
  }

  // 파일 크기 검증
  if (image.size > 5 * 1024 * 1024) {
    throw new Error("이미지 크기는 5MB 이하여야 합니다.");
  }

  // 파일 이름 검증
  if (!/^[a-zA-Z0-9._-]+$/.test(image.name)) {
    throw new Error("이미지 파일 이름은 영어로만 이루어져야 합니다.");
  }

  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch(`${API_URL}/${TENANT_ID}/images/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`이미지 업로드 실패: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.url) {
      throw new Error("이미지 URL을 가져오지 못했습니다.");
    }
    return result.url; // 서버에서 반환된 업로드된 이미지의 URL
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  }
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
