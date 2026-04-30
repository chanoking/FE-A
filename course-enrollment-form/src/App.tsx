import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Complete from "./pages/Complete.tsx";
import Confirm from "./pages/Confirm.tsx";
import Courses from "./pages/Courses.tsx";
import GroupRegistrationForm from "./pages/GroupRegistrationForm.tsx";
import PersonalRegistrationForm from "./pages/PersonalRegistrationForm.tsx";
import { 
   type GroupFormValues,
   type PersonalFormValues,
   type CourseValues,
   type ApplicationType } from "./types/form.ts";

function App() {
  const [courseData, setCourseData] = useState<CourseValues>({
    id: "",
    title: "",
    description: "",
    category: "",
    price: 0,
    maxCapacity: 0,
    currentEnrollment: 0,
    startDate: "",
    endDate: "",
    instructor: ""
  });

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

  const [applicationType, setApplicationType] = useState<ApplicationType>("personal");

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/courses"
          element={
            <Courses
              applicationType={applicationType}
              setApplicationType={setApplicationType}
              courseData={courseData}
              setCourseData={setCourseData} />} />
        <Route
          path="/enrollment-personal"
          element={
            <PersonalRegistrationForm
              formData={personalFormData}
              setFormData={setPersonalFormData}
              setApplicationType={setApplicationType}
              courseData = {courseData}
            />
          }
        />
        <Route
          path="/enrollment-group"
          element={
            <GroupRegistrationForm
              formData={groupFormData}
              setFormData={setGroupFormData}
              setApplicationType={setApplicationType}
              courseData={courseData}
            />
          }
        />
        <Route 
          path="/confirm" 
          element={
            applicationType === "personal" ? (
              <Confirm
                applicationType="personal"
                formData={personalFormData}
                courseData={courseData}
              />
            ) : (
              <Confirm
                applicationType="group"
                formData={groupFormData}
                courseData={courseData}
              />
            ) 
          }
        /> 
        <Route 
          path="/complete" 
          element={
            applicationType === "personal" ? (
              <Complete
                applicationType="personal"
                formData={personalFormData}
                setFormData={setPersonalFormData}
                courseData={courseData}
                setCourseData={setCourseData}
              />
            ) : (
              <Complete
                applicationType="group"
                formData={groupFormData}
                setFormData={setGroupFormData}
                courseData={courseData}
                setCourseData={setCourseData}
              />
            ) 
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
