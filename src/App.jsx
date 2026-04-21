import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { StudyPlannerProvider } from "./context/StudyPlannerContext";
import Assignments from "./pages/Assignments";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Statistics from "./pages/Statistics";
import Timer from "./pages/Timer";

function App() {
  return (
    <StudyPlannerProvider>
      <Router>
        <div className="app-shell">
          <Navbar />
          <main className="page-shell">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <button className="help-fab" type="button" aria-label="Help">
            ?
          </button>
        </div>
      </Router>
    </StudyPlannerProvider>
  );
}

export default App;
