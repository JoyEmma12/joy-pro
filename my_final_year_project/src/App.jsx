import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/signup/Login";
import Signup from "./components/signup/SIgnup";
import "./App.css";
import GoogleLogin from "./components/signup/GoogleLogin";
import Dashboard from "./components/Dashboard/Dashboard";

import LessonScreen from "./components/Dashboard/LessonPage/LessonScreen";
import LessonPreviewScreen from "./components/Dashboard/LessonPage/LessonPreviewScreen";
import LessonCompleteScreen from "./components/Dashboard/LessonPage/LessonCompletedScreen";
import DashboardProgress from "./components/Dashboard/LessonPage/DashboardProgress";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lesson/:language" element={<LessonScreen />} />
          <Route
            path="/lessons/:language/:lessonId"
            element={<LessonPreviewScreen />}
          />
          <Route
            path="/lessons/:language/:lessonId/completed"
            element={<LessonCompleteScreen />}
          />
          <Route path="/dashboardprogress" element={<DashboardProgress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
