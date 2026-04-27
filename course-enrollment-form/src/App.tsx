import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Complete from "./pages/Complete.tsx";
import Confirm from "./pages/Confirm.tsx";
import Courses from "./pages/Courses.tsx";
import GroupRegistrationForm from "./pages/GroupRegistrationForm.tsx";
import PersonalRegistrationForm from "./pages/PersonalRegistrationForm.tsx";
import { type GroupFormValues, type PersonalFormValues } from "./types/form.ts";

function App() {
  const [personalFormData, setPersonalFormData] = useState<PersonalFormValues>({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [groupFormData, setGroupFormData] = useState<GroupFormValues>({
    name: "",
    email: "",
    phone: "",
    reason: "",
    participants: [],
    representativePhoneNumber: "",
    groupName: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/enrollment-personal"
          element={
            <PersonalRegistrationForm
              formData={personalFormData}
              setFormData={setPersonalFormData}
            />
          }
        />
        <Route
          path="/enrollment-group"
          element={
            <GroupRegistrationForm
              formData={groupFormData}
              setFormData={setGroupFormData}
            />
          }
        />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
