import TodoList from "@/components/todo-list";
import { fetchTodos } from "@/lib/api";

export default async function Home() {
  // 서버에서 초기 데이터 로드
  const todos = await fetchTodos();

  return (
    <div className="mx-auto my-2 flex min-h-screen max-w-screen-lg flex-col items-center justify-start gap-4 font-nanumSquareBold text-[16px]">
      <TodoList initialTodos={todos} />
    </div>
  );
}
