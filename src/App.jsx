import CourseList from "./components/CourseList.jsx"; //import

export default function App() { //app function that returns header and footer, with courselist in the middle, overall struct of the page
  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="topline">OPEN SOURCE STUDIO · WEEK 11 HOMEWORK</p>
          <h1>Course Manager for 22300778</h1>
          <p className="subtitle">These are your classes for 26-2</p>
        </div>
        <span className="tag">26-2</span>
      </header>
      <CourseList />
      <footer className="bottom">
        <span>OSS Week 11 · React</span>
        <span>Local state only · Refresh resets data</span>
      </footer>
    </main>
  );
}
