import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "./pages/Courses.tsx";
import PersonalRegistrationForm from "./pages/PersonalRegistrationForm.tsx";
import GroupRegistrationForm from "./pages/GroupRegistrationForm.tsx";
import Confirm from "./pages/Confirm.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrollment-personal" element={<PersonalRegistrationForm />} />
        <Route path="/enrollment-group" element={<GroupRegistrationForm />} />
        <Route path="/confirm" element={<Confirm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
