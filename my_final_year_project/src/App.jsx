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
import ProgressMain from "./components/Dashboard/LessonPage/ProgressMain";
import LanguageChart from "./components/Dashboard/LessonPage/LanguageChart";
import LessonLangScreen from "./components/Dashboard/LessonPage/LessonLangScreen";
import QuizScreen from "./components/Dashboard/LessonPage/Quizscreen";
import QuizLanguageSelection from "./components/Dashboard/LessonPage/QuizLanguageSelection";


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
          <Route path="/progress" element={<ProgressMain />} />
          <Route path="/progress/:language" element={<LanguageChart />} />
          <Route path="/lessons" element={<LessonLangScreen />} />

          <Route path="/quiz" element={<QuizLanguageSelection />} />
          <Route path="/quiz/:language" element={<QuizScreen />} />

          {/* <Route path="/lessons" element={<LessonScreen />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
