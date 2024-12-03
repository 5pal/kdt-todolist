"use client";

import { deleteTodo, updateTodo, updateTodoImage } from "@/lib/api";
import { TodoItemProps } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import CheckIcon from "./icons/check-icon";
import DeleteIcon from "./icons/delete-icon";

interface TodoDetailClientProps {
  initialTodo: TodoItemProps;
}

const TodoDetail: React.FC<TodoDetailClientProps> = ({ initialTodo }) => {
  const router = useRouter();
  const [todo] = useState<TodoItemProps>(initialTodo);
  const [name, setName] = useState(todo.name);
  const [memo, setMemo] = useState(todo.memo || null);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [image, setImage] = useState<File | null>(null);
  const [isChanged, setIsChanged] = useState(false); // 수정 여부 상태

  // 상태 변경 감지
  useEffect(() => {
    const imageChanged = image !== null;
    const hasChanges =
      name !== todo.name ||
      memo !== todo.memo ||
      isCompleted !== todo.isCompleted ||
      imageChanged;

    setIsChanged(hasChanges);
  }, [name, memo, isCompleted, image, todo]);

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value); // textarea 값 업데이트
  };

  // 이미지 크기 및 이름 검증
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }
      if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
        alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
        return;
      }
      setImage(file);
    }
  };

  // 수정 완료
  const handleSave = async () => {
    try {
      let imageUrl = todo.imageUrl || "";

      // 이미지가 변경되었을 경우 업로드
      if (image) {
        imageUrl = await updateTodoImage(image);
      }

      const updatedTodo = {
        name,
        memo: memo || undefined,
        isCompleted,
        imageUrl,
      };

      await updateTodo(todo.id, updatedTodo);

      alert("수정되었습니다.");
      router.replace("/"); // 목록 페이지로 이동
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 삭제
  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      alert("삭제되었습니다.");
      router.replace("/"); // 목록 페이지로 이동
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div
        className={`flex w-[400px] justify-center rounded-2xl border-2 border-black p-3 md:w-[700px] lg:w-[900px] ${
          !isCompleted ? "bg-white" : "bg-violet-100"
        }`}
      >
        <span className="flex items-center justify-center gap-2 underline underline-offset-2">
          {!isCompleted ? (
            <span>
              <svg
                className="mr-2 cursor-pointer"
                onClick={() => setIsCompleted((prev) => !prev)}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  fill="#FEFCE8"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
              </svg>
            </span>
          ) : (
            <span>
              <svg
                className="mr-2 cursor-pointer"
                onClick={() => setIsCompleted((prev) => !prev)}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#7C3AED" />
                <path
                  d="M8 16.2857L13.8182 22L24 12"
                  stroke="#FEFCE8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="w-full rounded-md bg-transparent px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </span>
      </div>

      <div className="flex h-full w-[400px] flex-col gap-4 md:w-[700px] lg:w-[900px] lg:flex-row">
        <div className="relative h-full w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 lg:w-[400px]">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover"
            />
          ) : todo.imageUrl ? (
            <img
              src={todo.imageUrl}
              alt="Saved Image"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <span>
              <svg
                className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M37.9466 5.3335H26.6666C14.8846 5.3335 5.33331 14.8848 5.33331 26.6668V37.9735C5.33331 49.7556 14.8846 59.3068 26.6666 59.3068H37.9466C49.7287 59.3068 59.28 49.7556 59.28 37.9735V26.6668C59.28 14.8848 49.7287 5.3335 37.9466 5.3335ZM21.6533 16.3202C24.5988 16.3202 26.9866 18.708 26.9866 21.6535C26.9866 24.599 24.5988 26.9868 21.6533 26.9868C18.7078 26.9868 16.32 24.599 16.32 21.6535C16.32 18.708 18.7078 16.3202 21.6533 16.3202ZM41.36 53.6535C48.9097 50.834 53.9231 43.6325 53.9466 35.5735L53.8666 30.9868C53.8666 29.8935 53.6533 27.8402 53.6533 27.8402H49.3066C39.2437 27.8707 30.0548 33.5634 25.5466 42.5602C22.2744 39.6349 18.0424 38.0124 13.6533 38.0002H10.4266C10.1886 44.1995 13.5557 49.9776 19.0666 52.8268C21.0367 53.8763 23.2345 54.4257 25.4666 54.4268H36.5866C38.2107 54.4501 39.8263 54.1883 41.36 53.6535Z"
                  fill="#E2E8F0"
                />
              </svg>
            </span>
          )}
          <span>
            <label
              htmlFor="file-upload"
              className="absolute bottom-4 right-4 cursor-pointer"
            >
              {image ? (
                // Image가 변경되었을 때 보여줄 SVG
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="31"
                    fill="#0F172A"
                    fillOpacity="0.5"
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                  <path
                    d="M33.3098 23.866C33.586 23.3877 34.1975 23.2239 34.6758 23.5L38.0481 25.447C38.5264 25.7231 38.6903 26.3347 38.4141 26.813L31.1837 39.3366C31.072 39.5299 30.8989 39.6803 30.6919 39.7639L27.1219 41.2048C26.8183 41.3273 26.4809 41.1299 26.4389 40.8052L25.9504 37.0233C25.9223 36.8058 25.9665 36.5851 26.0761 36.3952L33.3098 23.866Z"
                    fill="white"
                  />
                </svg>
              ) : (
                // 기본 SVG
                <svg
                  className="size-14"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="32" cy="32" r="32" fill="#E2E8F0" />
                  <path
                    d="M23 32L41 32"
                    stroke="#64748B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 41L32 23"
                    stroke="#64748B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </label>

            {/* 숨겨진 파일 업로드 input */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange} // 파일 변경 핸들러
            />
          </span>
        </div>

        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <svg
            className="absolute inset-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <g clipPath="url(#clip0_106_2948)">
              <rect width="696" height="426" fill="#FEFCE8" />
              <rect
                x="-6.10352e-05"
                y="65"
                width="696"
                height="311"
                fill="#FEFCE8"
              />
              <path
                d="M696 150L-21.3428 150"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 182L-21.3428 182"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 246L-21.3428 246"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 310L-21.3428 310"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 374L-21.3428 374"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 278L-21.3428 278"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 406L-21.3428 406"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 118L-21.3428 118"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path d="M696 86L-21.3428 86" stroke="#FEF3C7" strokeWidth="2" />
              <path d="M696 54L-21.3427 54" stroke="#FEF3C7" strokeWidth="2" />
              <path d="M696 22L-21.3426 22" stroke="#FEF3C7" strokeWidth="2" />
              <path
                d="M696 214L-21.3428 214"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
              <path
                d="M696 342L-21.3428 342"
                stroke="#FEF3C7"
                strokeWidth="2"
              />
            </g>
            <defs>
              <clipPath id="clip0_106_2948">
                <rect width="696" height="426" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h1 className="absolute left-1/2 top-4 -translate-x-1/2 transform text-center font-semibold text-amber-800">
            Memo
          </h1>

          {/* 스크롤과 편집기능이 있는 textarea */}
          <textarea
            placeholder="내용을 추가하거나 수정할 수 있습니다."
            className="absolute inset-x-8 bottom-8 top-16 resize-none overflow-auto rounded-lg bg-transparent p-2 font-nanumSquareRegular leading-tight text-gray-700 focus:outline-none"
            value={memo || ""}
            onChange={handleMemoChange}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4 lg:justify-end">
        <EditButton
          title="수정 완료"
          icon={<CheckIcon />}
          onClick={handleSave}
          isActive={isChanged}
        />
        <DeleteButton
          title="삭제하기"
          icon={<DeleteIcon />}
          onClick={handleDelete}
        />
      </div>
    </>
  );
};

export default TodoDetail;
