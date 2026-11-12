# OSS Week 11 — React Course Manager (Student Starter)

React + Vite 기반 학생 배포용 Sample Project입니다. **조회와 삭제는 완성**, 등록 및 완료 변경은 학생이 직접 구현하도록 `TODO`로 남겨두었습니다.

## 실행 방법

Node.js 20.19+ 또는 22.12+ 권장.

```bash
npm install
npm run dev
```

브라우저에 표시되는 Local URL에 접속하세요. 빌드 테스트: `npm run build`.

## 소스 구조

- `src/App.jsx`: 페이지 전체 레이아웃
- `src/components/CourseList.jsx`: State 및 목록, 삭제 로직, **TODO 1/2**
- `src/components/CourseItem.jsx`: Props로 데이터를 받고 이벤트 콜백 호출
- `src/data/courses.js`: 초기 과목 데이터
- `src/App.css`: 전체 디자인

## 수행 내용

1. 코드를 실행하고 목록 조회·삭제를 확인합니다.
2. 초기 과목 5개 이상, 제목, CSS 3곳 이상 변경합니다.
3. `CourseList.jsx`의 **TODO 1**: 과목 등록 (빈 값 입력 방지, 고유 id 지정, State 업데이트).
4. `CourseList.jsx`의 **TODO 2**: 완료 체크박스 클릭 시 `completed` 상태 변경.
5. 선택: 검색/필터, 이름 수정 기능 추가.
6. GitHub에 Commit/Push 후 Vercel에 배포합니다.
7. README에 프로젝트 소개, 주요 코드 분석 2개, 변경 내용, Weekly Review, GitHub URL, Vercel URL을 정리합니다.

## 확인할 질문

- `CourseList`와 `CourseItem`의 역할은?
- 왜 `courses`를 직접 수정하지 않고 `setCourses()`를 사용할까요?
- `map()`과 `filter()`는 각각 어떤 목적인가요?
- `course`, `onDelete`, `onToggle` Props는 어디에서 전달되나요?
- 브라우저 새로고침 시 데이터가 초기화되는 이유는? (DB/localStorage 없음)

> 교육 목적의 로컬 State 앱입니다. 서버 API 및 데이터베이스는 사용하지 않습니다.

## 제공된 소스코드를 읽고 다음 내용을 분석합니다.

### Project Structure: 주요 파일 3개의 역할

1. App.jsx
   - main layout of the page, with the header, maincontent and footer. in maincontent calls CourseList
2. CourseList.jsx
   - Parent Component that has list, and calls on CourseItem for each item. Has CRUD logic and renders courseItem
3. CourseItem.jsx
   - shows course in one line, doesnt have a state and shows the value received by props. has checkbox and delete button.

Index -> main -> App -> CourseList -> CourseItem

### Component & Props: CourseList와 CourseItem의 관계 및 Props 전달 방식

courselist is the parent to courseitem. CourseList renders courseItem in its main section with the usage of map.

<CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />

These values go into CourseItem function in CourseItem.jsx 

coursItem can take course, onDelete, onToggle. 

key={course.id} is not a prop but key for list 

course is the object being passed that has (id, name, category, completed )

onDelete and onToggle is function defined from the parrent thats passed down to the child. The child calls these to change what the parent is displaying, it is a callback. 



### State & Event: useState를 이용한 상태 관리 및 삭제 버튼의 동작 원리


  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState("");


courses is the array of courses, which is updated on delete add and toggle 

newName is value in the input field, has to be updated every key typed 

When delete button is pressed: 
1. button calls handleDelete(id) with onClick 
2. course.id goes into the function 
3. The function first aasks if they are sure with an  window.confirm. if the user cancels the function returns.
4. user confirms then setCourses uses filter to make an array without the id with '!='. 
5. state changes and the re render shows CourseItem array without the id selected. 


### Code Analysis: 주요 코드 2개(각 5~15줄)를 선택하여 동작 원리 설명
{courses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />

This code is important because it is render. 
map creates an CourseItem per course. 

id is the unique value for just choosing the unique courseItem.

There is props passing with onDelete and onToggle so the functions defined in CourseList can be used by the courseItem. Callback 

function handleDelete(id) {
    if (!window.confirm("이 과목을 삭제하시겠습니까?")) return;
    setCourses((previous) => previous.filter((course) => course.id !== id));
  }

window.confirm shows an OK/Cancel dialog. If the user cancels, it returns `false` and the function exits immediately.
The call to setCourses passes a update, (previous) => .... previous is the latest state, so the update is safe even when it is called several times in a row.
filter creates a new array*and leaves the original unchanged. React detects changes by reference, so this is the correct way to update state.