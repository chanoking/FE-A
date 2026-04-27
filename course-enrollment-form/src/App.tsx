import { BrowserRouter, Route, Routes } from "react-router-dom";
import Complete from "./pages/Complete.tsx";
import Confirm from "./pages/Confirm.tsx";
import Courses from "./pages/Courses.tsx";
import GroupRegistrationForm from "./pages/GroupRegistrationForm.tsx";
import PersonalRegistrationForm from "./pages/PersonalRegistrationForm.tsx";
import { useState } from "react";

type PersonalFormValues = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

function App() {
    const [formData, setFormData] = useState<PersonalFormValues>({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/enrollment-personal"
          element={
          <PersonalRegistrationForm
            formData={formData}
            setFormData={setFormData} />}
        />
        <Route path="/enrollment-group" element={<GroupRegistrationForm />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
