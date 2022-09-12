import { BrowserRouter, Route, Routes } from "react-router-dom";
import Questions from '../pages/questions';
// import { Link } from "react-router-dom";
import QuestionRecording from "../pages/camara.tsx";
import Home from "../pages/home";
export default function Rutas() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/questions/camara" element={<QuestionRecording />} />
        <Route path="/questions/camara/:id" element={<QuestionRecording />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="*" element={<Home />} />
        {/* <Route path="/" element={#}/> */}
      </Routes>
    </BrowserRouter>
  )
}

