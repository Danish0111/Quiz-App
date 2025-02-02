import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from './Components/Quiz'
import StartQuiz from './Components/StartQuiz';
import Results from './Components/Results';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartQuiz />}/>
          <Route path="/quiz" element={<Quiz />}/>
          <Route path="/results" element={<Results />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
