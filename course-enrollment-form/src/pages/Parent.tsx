import { useState } from "react";
import PersonalRegistrationForm from "./PersonalRegistrationForm";
import GroupRegistrationForm from "./GroupRegistrationForm";

function Parent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  const [type, setType] = useState<"personal" | "group">("personal");

  return (
    <>
      {/* 선택 UI */}
      <button onClick={() => setType("personal")}>개인</button>
      <button onClick={() => setType("group")}>단체</button>

      {/* 조건 렌더링 */}
      {type === "personal" && (
        <PersonalRegistrationForm
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {type === "group" && (
        <GroupRegistrationForm
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
}