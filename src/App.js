// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from './pages/Home';
// import { Link } from "react-router-dom";
// import Question1 from "./pages/camara.tsx";
import Rutas from "./routes/routes";
export default function App() {
  return (
    <Rutas/>
    // <BrowserRouter>
    //   <Link to="/home" target="_self">
    //     <button>Link Button</button>
    //   </Link>
    //   <Routes>
    //     <Route path="/camara" element={<Question1 />} />
    //     <Route path="/home" element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
  )
}