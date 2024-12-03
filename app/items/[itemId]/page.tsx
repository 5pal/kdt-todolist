import TodoDetail from "@/components/todo-detail";
import { fetchTodoById, fetchTodos } from "@/lib/api";

// Static Params 생성
export async function generateStaticParams() {
  const todos = await fetchTodos(); // fetchTodos를 사용해 모든 Todo 가져오기
  return todos.map((todo) => ({
    id: todo.id, // 각 Todo의 id를 params로 설정
  }));
}

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;

  // 서버에서 데이터를 로드
  const todo = await fetchTodoById(itemId);

  return (
    <div className="flex h-[800px] flex-col gap-4 lg:h-[400px]">
      <TodoDetail initialTodo={todo} />
    </div>
  );
}
