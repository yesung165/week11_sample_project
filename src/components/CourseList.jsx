import { useState } from "react";
import CourseItem from "./CourseItem.jsx";
import { initialCourses } from "../data/courses.js";

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("all"); // all done and active
  const [search, setSearch] = useState(""); // search keyword for subject name

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm("이 과목을 삭제하시겠습니까?")) return;
    setCourses((previous) => previous.filter((course) => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();

    //if empty
    const name = newName.trim();
    if (name === "") return;

    setCourses((previous) => {
      // new object
      const newCourse = {
        id: previous.length > 0 ? Math.max(...previous.map((c) => c.id)) + 1 : 1, //same logic used in crud js 
        name,
        category: "Major",
        completed: false,
      };
      return [...previous, newCourse]; //old array plusn new object
    });
    setNewName("");
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
  setCourses((previous) =>
    previous.map((course) => //map
      course.id === id 
        ? { ...course, completed: !course.completed } //flip
        : course //return false
    )
  );
}

  const doneCount = courses.filter((course) => course.completed).length;

  // show only the courses that match the dropdown
  let visibleCourses = courses;
  if (filter === "done") {
    visibleCourses = courses.filter((course) => course.completed === true);
  } else if (filter === "active") {
    visibleCourses = courses.filter((course) => course.completed === false);
  }

  // search by subject name then can filter
  const keyword = search.trim().toLowerCase();
  if (keyword !== "") {
    visibleCourses = visibleCourses.filter((course) =>
      course.name.toLowerCase().includes(keyword)
    );
  }

  return (
    <>
      {" "}
      {/* This is a comment */}
      <section className="stats" aria-label="과목 통계">
        <div className="stat">
          <span>전체 과목</span>
          <strong>{courses.length}</strong>
        </div>
        <div className="stat">
          <span>완료</span>
          <strong className="green">{doneCount}</strong>
        </div>
        <div className="stat">
          <span>진행 중</span>
          <strong className="blue">{courses.length - doneCount}</strong>
        </div>
      </section>
      <section className="panel">
        {" "}
        {/* Second Table */}
        <div className="panel-header">
          <h2>My Courses</h2>
          <span className="small-note">{courses.length} courses</span>
        </div>
        <p className="todo">
          You can do it!! Get through the semester!!
        </p>
        <form className="add-form" onSubmit={handleAdd}>
          {" "}
          {/*  add */}
          <input
            className="input"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
          />
          <button className="btn primary" type="submit">
            + Add Course
          </button>
        </form>


        {/* search box*/}
        <div className="tools">
          <input
            className="input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="과목명 검색"
            aria-label="과목 검색"
          />
        </div>

        {/* drop down filter */}
        <div className="filters">
          <select
            className="input"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">전체</option>
            <option value="done">완료</option>
            <option value="active">미완료</option>
          </select>
        </div>


        
        <div className="list-head">
          <span>COURSE</span>
          <span>CATEGORY</span>
          <span>ACTIONS</span>
        </div>
        {visibleCourses.length === 0 && (
          <p className="empty">찾을수 없습니다</p>
        )}

        {visibleCourses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}{" "}
        {/*  couse Item */}
      </section>
    </>
  );
}
