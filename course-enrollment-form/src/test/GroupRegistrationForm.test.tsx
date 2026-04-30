import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import GroupRegistrationForm from "../pages/GroupRegistrationForm";
import { useState } from "react";

const mockNavigate = vi.fn();

const mockCourse = {
  id: "1",
  title: "React 강의",
  description: "설명",
  category: "개발",
  price: 10000,
  maxCapacity: 20,
  currentEnrollment: 5,
  startDate: "2026-05-01T00:00:00.000Z",
  endDate: "2026-05-10T00:00:00.000Z",
  instructor: "진찬호",
};

const mockCourseB = {
  id: "1",
  title: "",
  description: "설명",
  category: "개발",
  price: 10000,
  maxCapacity: 20,
  currentEnrollment: 5,
  startDate: "2026-05-01T00:00:00.000Z",
  endDate: "2026-05-10T00:00:00.000Z",
  instructor: "진찬호",
};

const Wrapper = () => {
  const [type, setType] = useState("group");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    representativePhoneNumber: "",
    participants: []
  })

  return (
    <GroupRegistrationForm
      applicationType={type}
      setApplicationType={setType}
      courseData={mockCourse}
      setFormData={setForm}
      formData={form} />
  )
}

const WrapperB = () => {
  const [type, setType] = useState("group");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    representativePhoneNumber: "",
    participants: []
  })

  return (
    <GroupRegistrationForm
      applicationType={type}
      setApplicationType={setType}
      courseData={mockCourseB}
      setFormData={setForm}
      formData={form} />
  )
}

const renderGroupPage = () => {
  return render(
    <MemoryRouter>
      <Wrapper />
    </MemoryRouter>
  )
}

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// const renderGroupPage = (state?: unknown) => {
//   return render(
//     <MemoryRouter
//       initialEntries={[
//         {
//           pathname: "/enrollment-group",
//           state,
//         },
//       ]}
//     >
//       <Routes>
//         <Route path="/enrollment-group" element={<GroupRegistrationForm />} />
//       </Routes>
//     </MemoryRouter>
//   );
// };

describe("GroupRegistrationForm", () => {
  test("course가 없으면 에러 메시지를 보여준다", () => {
    render(
    <MemoryRouter>
      <WrapperB />
    </MemoryRouter>
  )

    expect(screen.getByText("잘못된 접근입니다.")).toBeInTheDocument();
  });

  test("course가 있으면 제목이 렌더링된다", () => {
    renderGroupPage();

    expect(screen.getAllByText("React 강의")[0]).toBeInTheDocument();
  });

  test("참가자는 최대 10명까지만 추가된다", () => {
    renderGroupPage();

    const addButton = screen.getByRole("button", { name: "추가하기" });

    for (let i = 0; i < 10; i++) {
      fireEvent.change(screen.getByPlaceholderText("이름"), {
        target: { value: `참가자${i}` },
      });

      fireEvent.change(screen.getByPlaceholderText("example2@domain.com"), {
        target: { value: `user${i}@test.com` },
      });

      fireEvent.click(addButton);
    }

    fireEvent.change(screen.getByPlaceholderText("이름"), {
      target: { value: "초과" },
    });

    fireEvent.change(screen.getByPlaceholderText("example2@domain.com"), {
      target: { value: "over@test.com" },
    });

    fireEvent.click(addButton);

    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    expect(screen.getByText("최대 10명까지 등록 가능합니다.")).toBeInTheDocument();
});

  test("중복 이메일은 추가되지 않는다", async () => {
    const user = userEvent.setup();

    renderGroupPage();

    const addButton = screen.getByRole("button", { name: "추가하기" });

    await user.type(screen.getByPlaceholderText("이름"), "홍길동");
    await user.type(
      screen.getByPlaceholderText("example2@domain.com"),
      "same@test.com"
    );

    await user.click(addButton);

    await user.clear(screen.getByPlaceholderText("이름"));
    await user.type(screen.getByPlaceholderText("이름"), "김철수");

    await user.clear(screen.getByPlaceholderText("example2@domain.com"));
    await user.type(
      screen.getByPlaceholderText("example2@domain.com"),
      "same@test.com"
    );

    await user.click(addButton);

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("이메일이 중복되었습니다.")).toBeInTheDocument();
  });
});