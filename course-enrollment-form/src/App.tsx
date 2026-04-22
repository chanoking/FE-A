import {BrowserRouter, Routes, Route} from "react-router-dom"
import Courses from "./pages/Courses.tsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/courses" element={<Courses/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
