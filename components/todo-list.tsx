"use client";

import AddButton from "@/components/add-button";
import DoneItem from "@/components/done-item";
import DoneIcon from "@/components/icons/done-icon";
import PlusIcon from "@/components/icons/plus-icon";
import TodoIcon from "@/components/icons/todo-icon";
import TodoItem from "@/components/todo-item";
import { createTodo, updateTodo } from "@/lib/api";
import { ITodoItem } from "@/lib/type";
import { useState } from "react";

interface TodoListProps {
  initialTodos: ITodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos }) => {
  const [todos, setTodos] = useState<ITodoItem[]>(initialTodos);
  const [text, setText] = useState("");

  // 새 할 일 추가
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const newTodo = await createTodo({ name: text });
      setTodos((prev) => [newTodo, ...prev]);
      setText("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // 할 일 상태 토글
  const handleToggle = async (id: string, isCompleted: boolean) => {
    try {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
        ),
      );
      await updateTodo(id, { isCompleted: !isCompleted });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // 진행 중과 완료된 항목 분리
  const ongoingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <>
      <form
        className="mb-4 flex w-[400px] justify-between gap-4 md:w-[700px] lg:w-[1000px]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="h-14 w-full flex-grow rounded-full border-2 border-b-[5px] border-r-[5px] border-black bg-slate-100 p-6 font-nanumSquareRegular outline-none"
          placeholder="할 일을 입력해주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <AddButton
          type="submit"
          title="추가하기"
          isActive={!!text.trim()}
          icon={<PlusIcon isActive={!!text.trim()} />}
        />
        {/* Mobile 버전 추가 버튼 */}
        <span onClick={handleSubmit} className="block cursor-pointer md:hidden">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2.21729"
              y="5"
              width="52.7826"
              height="50"
              rx="23"
              fill="#0F172A"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <rect
              x="1"
              y="1"
              width="52.7826"
              height="50"
              rx="23"
              fill={!!text.trim() ? "#7C3AED" : "#E2E8F0"}
              stroke="#0F172A"
              strokeWidth="2"
            />
            <path
              d="M20 26L32 26"
              stroke={!!text.trim() ? "white" : "#64748B"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M26 32L26 20"
              stroke={!!text.trim() ? "white" : "#64748B"}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </form>

      <div className="flex w-[400px] md:w-[700px] lg:w-[1000px]">
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          {/* 진행 중 할 일 */}
          <div className="flex w-full flex-col gap-3">
            <TodoIcon />
            {ongoingTodos.length > 0 ? (
              ongoingTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                />
              ))
            ) : (
              <span className="flex select-none flex-col items-center justify-center *:text-slate-400">
                <svg
                  className="h-[120px] w-[120px] md:h-[240px] md:w-[240px]"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M70.8701 177.993C72.9801 175.968 75.4924 175.999 78.9383 178.218C80.5881 179.28 82.4519 180.844 84.588 182.924C88.7462 186.974 90.1131 190.912 90.4781 193.601C90.5916 194.437 89.64 194.858 89.0125 194.294L70.8701 177.993Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M89.918 156.793V156.793C94.7764 168.347 84.8069 180.656 72.4962 178.304L70.8701 177.993M70.8701 177.993C73.9903 174.999 77.9903 176.499 84.588 182.924C88.7462 186.974 90.1131 190.912 90.4781 193.601C90.5916 194.437 89.64 194.858 89.0125 194.294L70.8701 177.993Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <path
                    d="M131.5 184.999C123.9 184.999 121 188.665 118 190.499H142.39C143.233 190.499 143.669 189.542 143.038 188.982C140.974 187.151 137.323 184.999 131.5 184.999Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M118 161.999V190.499M118 190.499C121 188.665 123.9 184.999 131.5 184.999C137.323 184.999 140.974 187.151 143.038 188.982C143.669 189.542 143.233 190.499 142.39 190.499H118Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <path
                    d="M33 139.391C45.0291 116.033 65.364 78.202 77.9659 86.1665C93.7183 96.1222 55.0534 126.755 73.6698 139.391C92.2863 152.027 109.471 74.6791 126.369 86.1664C143.267 97.6538 110.044 127.904 123.218 139.391C133.758 148.581 151.859 116.31 166.466 91.5489"
                    stroke="#E2E8F0"
                    strokeWidth="49.0909"
                    strokeLinecap="round"
                  />
                  <path
                    d="M107 112.499C107 116.903 105.916 120.842 104.216 123.648C102.505 126.471 100.277 127.999 98 127.999C95.7229 127.999 93.4954 126.471 91.7841 123.648C90.084 120.842 89 116.903 89 112.499C89 108.094 90.084 104.155 91.7841 101.35C93.4954 98.5261 95.7229 96.9986 98 96.9986C100.277 96.9986 102.505 98.5261 104.216 101.35C105.916 104.155 107 108.094 107 112.499Z"
                    fill="white"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M107 112.499C107 115.242 106.31 117.679 105.246 119.397C104.173 121.13 102.821 121.999 101.5 121.999C100.179 121.999 98.8272 121.13 97.7541 119.397C96.6905 117.679 96 115.242 96 112.499C96 109.755 96.6905 107.318 97.7541 105.6C98.8272 103.867 100.179 102.999 101.5 102.999C102.821 102.999 104.173 103.867 105.246 105.6C106.31 107.318 107 109.755 107 112.499Z"
                    fill="#E2E8F0"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M133 112.499C133 116.903 131.916 120.842 130.216 123.648C128.505 126.471 126.277 127.999 124 127.999C121.723 127.999 119.495 126.471 117.784 123.648C116.084 120.842 115 116.903 115 112.499C115 108.094 116.084 104.155 117.784 101.35C119.495 98.5261 121.723 96.9986 124 96.9986C126.277 96.9986 128.505 98.5261 130.216 101.35C131.916 104.155 133 108.094 133 112.499Z"
                    fill="white"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M133 112.499C133 115.242 132.31 117.679 131.246 119.397C130.173 121.13 128.821 121.999 127.5 121.999C126.179 121.999 124.827 121.13 123.754 119.397C122.69 117.679 122 115.242 122 112.499C122 109.755 122.69 107.318 123.754 105.6C124.827 103.867 126.179 102.999 127.5 102.999C128.821 102.999 130.173 103.867 131.246 105.6C132.31 107.318 133 109.755 133 112.499Z"
                    fill="#E2E8F0"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M176.17 135.94C181.511 137.526 187.135 137.204 191.481 132.46C200.476 122.643 185.021 130.689 176.17 135.94Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M161.916 127.374C165.072 130.364 170.459 134.243 176.17 135.94M176.17 135.94C181.511 137.526 187.135 137.204 191.481 132.46C200.476 122.643 185.021 130.689 176.17 135.94Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <g clipPath="url(#clip0_95_1362)">
                    <path
                      d="M155.559 46.1517C155.25 45.0912 155.86 43.981 156.92 43.672L184.762 35.5595C185.823 35.2505 186.933 35.8597 187.242 36.9201L226.789 172.644C226.904 173.039 226.894 173.46 226.761 173.849L218.617 197.732C218.17 199.044 216.556 199.514 215.475 198.648L195.776 182.877C195.455 182.62 195.221 182.27 195.106 181.876L155.559 46.1517Z"
                      fill="#E2E8F0"
                    />
                    <g clipPath="url(#clip1_95_1362)">
                      <mask
                        id="mask0_95_1362"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="155"
                        y="35"
                        width="72"
                        height="165"
                      >
                        <path
                          d="M155.559 46.1517C155.25 45.0912 155.86 43.981 156.92 43.672L184.762 35.5595C185.823 35.2505 186.933 35.8597 187.242 36.9201L226.789 172.644C226.904 173.039 226.894 173.46 226.761 173.849L218.617 197.732C218.17 199.044 216.556 199.514 215.475 198.648L195.776 182.877C195.455 182.62 195.221 182.27 195.106 181.876L155.559 46.1517Z"
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_95_1362)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M205.557 203.445L157.721 39.2722L159.642 38.7128L207.478 202.886L205.557 203.445Z"
                          fill="#CBD5E1"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M211.318 201.767L163.482 37.5938L165.402 37.0343L213.238 201.207L211.318 201.767Z"
                          fill="#CBD5E1"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M217.078 200.088L169.242 35.9153L171.163 35.3559L218.999 199.529L217.078 200.088Z"
                          fill="#CBD5E1"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M222.839 198.41L175.003 34.2369L176.923 33.6774L224.759 197.85L222.839 198.41Z"
                          fill="#CBD5E1"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M228.599 196.731L180.763 32.5584L182.683 31.9989L230.519 196.172L228.599 196.731Z"
                          fill="#CBD5E1"
                        />
                      </g>
                    </g>
                  </g>
                  <mask
                    id="mask1_95_1362"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="156"
                    y="35"
                    width="71"
                    height="165"
                  >
                    <path
                      d="M156.146 46.2849C155.837 45.2244 156.446 44.1142 157.507 43.8052L184.389 35.9724C185.449 35.6634 186.56 36.2726 186.869 37.3331L226.42 173.072C226.532 173.458 226.526 173.868 226.402 174.25L218.713 197.908C218.277 199.249 216.627 199.73 215.538 198.833L196.345 183.008C196.035 182.752 195.81 182.409 195.697 182.024L156.146 46.2849Z"
                      fill="#94A3B8"
                    />
                  </mask>
                  <g mask="url(#mask1_95_1362)">
                    <rect
                      x="206.938"
                      y="196.16"
                      width="19.3939"
                      height="11"
                      transform="rotate(-16.2448 206.938 196.16)"
                      fill="#94A3B8"
                    />
                  </g>
                  <path
                    d="M178.333 126.557C183.882 126.058 188.989 123.68 191.275 117.666C196.006 105.22 184.618 118.407 178.333 126.557Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M161.923 123.865C165.96 125.477 172.4 127.091 178.333 126.557M178.333 126.557C183.882 126.058 188.989 123.68 191.275 117.666C196.006 105.22 184.618 118.407 178.333 126.557Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <defs>
                    <clipPath id="clip0_95_1362">
                      <rect
                        width="33"
                        height="167.5"
                        fill="white"
                        transform="translate(155 44.2315) rotate(-16.2448)"
                      />
                    </clipPath>
                    <clipPath id="clip1_95_1362">
                      <rect
                        width="33"
                        height="167.5"
                        fill="white"
                        transform="translate(155 44.2315) rotate(-16.2448)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>할 일이 없어요.</span>
                <span>TODO를 새롭게 추가해주세요!</span>
              </span>
            )}
          </div>

          {/* 완료된 할 일 */}
          <div className="flex w-full flex-col gap-3">
            <DoneIcon />
            {completedTodos.length > 0 ? (
              completedTodos.map((todo) => (
                <DoneItem
                  key={todo.id}
                  {...todo}
                  onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                />
              ))
            ) : (
              <span className="flex select-none flex-col items-center justify-center *:text-slate-400">
                <svg
                  className="h-[120px] w-[120px] md:h-[240px] md:w-[240px]"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M135.138 190.104C142.738 190.104 145.638 193.771 148.638 195.604L124.248 195.604C123.405 195.604 122.969 194.648 123.6 194.088C125.664 192.257 129.315 190.104 135.138 190.104Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M148.638 167.104L148.638 195.604M148.638 195.604C145.638 193.771 142.738 190.104 135.138 190.104C129.315 190.104 125.664 192.257 123.6 194.088C122.969 194.648 123.405 195.604 124.248 195.604L148.638 195.604Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <path
                    d="M94.1379 190.104C101.738 190.104 104.638 193.771 107.638 195.604L83.2482 195.604C82.4046 195.604 81.9691 194.648 82.6001 194.088C84.6637 192.257 88.3147 190.104 94.1379 190.104Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M107.638 167.104L107.638 195.604M107.638 195.604C104.638 193.771 101.738 190.104 94.1379 190.104C88.3147 190.104 84.6637 192.257 82.6001 194.088C81.9691 194.648 82.4046 195.604 83.2482 195.604L107.638 195.604Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <path
                    d="M192.466 144.392C180.437 121.035 160.102 83.2034 147.5 91.1679C131.747 101.124 170.412 131.756 151.796 144.392C133.18 157.028 115.995 79.6805 99.0971 91.1679C82.1991 102.655 115.422 132.905 102.248 144.392C91.7078 153.582 73.6068 121.312 59.0001 96.5503"
                    stroke="#E2E8F0"
                    strokeWidth="49.0909"
                    strokeLinecap="round"
                  />
                  <path
                    d="M92 120C92.4594 118.667 94.6648 116 99.8108 116C104.957 116 108.081 118.667 109 120"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M122 120C122.459 118.667 124.665 116 129.811 116C134.957 116 138.081 118.667 139 120"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M197 82C197.47 76.4482 188.665 75.196 183.5 75.4999C158 77 180.837 80.0282 197 82Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M195.618 103.663C221.168 101.619 203.834 85.9742 197 82M197 82C197.47 76.4482 188.665 75.196 183.5 75.4999C158 77 180.837 80.0282 197 82Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  <path
                    d="M176.831 38.1936C178.8 32.1397 181.625 30.6925 184.251 31.5467C186.877 32.4008 188.309 35.2329 186.34 41.2869C184.371 47.3408 177.755 51.5167 177.755 51.5167C177.755 51.5167 174.861 44.2475 176.831 38.1936Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M191.992 48.4105C194.486 46.0981 196.18 46.1576 197.183 47.2391C198.186 48.3207 198.118 50.0148 195.625 52.3272C193.131 54.6397 188.958 54.8672 188.958 54.8672C188.958 54.8672 189.499 50.723 191.992 48.4105Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M195.887 57.1417C198.397 57.1415 199.285 58.024 199.285 59.1128C199.285 60.2015 198.398 61.0842 195.888 61.0843C193.378 61.0845 191.005 59.1133 191.005 59.1133C191.005 59.1133 193.377 57.1418 195.887 57.1417Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M205.142 51.3662C206.832 51.033 207.555 51.5527 207.71 52.3392C207.865 53.1256 207.393 53.8808 205.703 54.214C204.013 54.5472 202.134 53.4383 202.134 53.4383C202.134 53.4383 203.451 51.6994 205.142 51.3662Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M39.6073 144.254C34.3814 146.186 28.7484 146.232 24.1011 141.781C14.4844 132.573 30.4316 139.593 39.6073 144.254Z"
                    fill="#E2E8F0"
                  />
                  <path
                    d="M61.5 130C58.5461 133.19 45.1951 142.187 39.6073 144.254M39.6073 144.254C34.3814 146.186 28.7484 146.232 24.1011 141.781C14.4844 132.573 30.4316 139.593 39.6073 144.254Z"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                </svg>

                <span>아직 다 한 일이 없어요.</span>
                <span>해야 할 일을 체크해보세요!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
