# KDT TodoList

Next.js와 TypeScript를 사용하여 구현한 할 일 관리 웹 애플리케이션입니다.

## 주요 기능

- 할 일 목록 조회/추가/수정/삭제
- 할 일 완료 상태 토글
- 할 일 상세 정보 (메모, 이미지) 관리
- 반응형 디자인 지원

## 기술 스택

- **Frontend**: Next.js 15.0.3, React 19
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **폰트**: Nanum Square (Regular, Bold)
- **아이콘**: SVG (SVGR을 통한 컴포넌트화)
- **코드 품질**: ESLint, Prettier

## 사용 방법

### 할 일 관리

1. **할 일 추가**

   - 메인 화면의 입력창에 할 일을 입력
   - 추가 버튼 클릭 또는 Enter 키를 눌러 할 일 추가

2. **할 일 완료/미완료 전환**

   - 할 일 항목 왼쪽의 체크박스를 클릭하여 상태 전환
   - 완료된 할 일은 보라색 배경으로 표시되며 취소선이 추가됨

3. **할 일 상세 정보 확인/수정**

   - 할 일 항목을 클릭하여 상세 페이지로 이동
   - 메모 추가/수정
   - 이미지 업로드/수정
   - 저장 버튼을 클릭하여 변경사항 저장

4. **할 일 삭제**
   - 상세 페이지에서 삭제 버튼을 클릭하여 할 일 삭제

## 프로젝트 구조

```
kdt-todolist/
├── app/ # Next.js 앱 디렉토리
│ ├── layout.tsx # 전역 레이아웃
│ ├── page.tsx # 메인 페이지
│ └── items/ # 할 일 상세 페이지
├── components/ # React 컴포넌트
│ ├── todo-list.tsx # 할 일 목록 컴포넌트
│ ├── todo-item.tsx # 할 일 항목 컴포넌트
│ └── todo-detail.tsx # 할 일 상세 컴포넌트
├── lib/ # 유틸리티 함수
│ ├── api.ts # API 통신 함수
│ └── type.ts # TypeScript 타입 정의
└── public/ # 정적 파일
```

## 개발 환경 설정

- **Prettier 설정**

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- **Tailwind CSS 설정**
  - 커스텀 폰트 패밀리
  - 커스텀 색상
  - 반응형 디자인을 위한 브레이크포인트

## MIT License
