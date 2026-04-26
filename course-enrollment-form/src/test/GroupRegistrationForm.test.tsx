import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test } from "vitest";

import GroupRegistrationForm from "../pages/GroupRegistrationForm";

/**
 * mock 데이터
 */
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
  instructor: "강사",
};

/**
 * 공통 렌더 함수
 */
const renderWithState = (state?: any) => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/enrollment-group",
          state,
        },
      ]}
    >
      <Routes>
        <Route path="/enrollment-group" element={<GroupRegistrationForm />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("GroupRegistrationForm", () => {
  /**
   * 1️⃣ 잘못된 접근
   */
  test("course가 없으면 에러 메시지를 보여준다", () => {
    renderWithState({});

    expect(screen.getByText("잘못된 접근입니다.")).toBeInTheDocument();
  });

  /**
   * 2️⃣ 정상 렌더링
   */
  test("course가 있으면 제목이 렌더링된다", () => {
    renderWithState({ course: mockCourse });

    expect(screen.getByText("React 강의")).toBeInTheDocument();
  });

  /**
   * 3️⃣ 참가자 추가
   */
  test("참가자를 추가하면 리스트에 표시된다", async () => {
    const user = userEvent.setup();

    renderWithState({ course: mockCourse });

    const nameInput = screen.getByPlaceholderText("이름");
    const emailInput = screen.getByPlaceholderText("example2@domain.com");
    const addButton = screen.getByRole("button", { name: "추가하기" });

    await user.type(nameInput, "홍길동");
    await user.type(emailInput, "test@test.com");
    await user.click(addButton);

    expect(screen.getByText("홍길동(test@test.com)")).toBeInTheDocument();
  });

  /**
   * 4️⃣ 최대 10명 제한
   */
  test("참가자는 최대 10명까지만 추가된다", async () => {
    const user = userEvent.setup();

    renderWithState({ course: mockCourse });

    const nameInput = screen.getByPlaceholderText("이름");
    const emailInput = screen.getByPlaceholderText("example2@domain.com");
    const addButton = screen.getByRole("button", { name: "추가하기" });

    for (let i = 0; i < 10; i++) {
      await user.clear(nameInput);
      await user.type(nameInput, `참가자${i}`);

      await user.clear(emailInput);
      await user.type(emailInput, `user${i}@test.com`);

      await user.click(addButton);
    }

    // 11번째 시도
    await user.clear(nameInput);
    await user.type(nameInput, "초과");

    await user.clear(emailInput);
    await user.type(emailInput, "over@test.com");

    await user.click(addButton);

    const items = screen.getAllByRole("listitem");

    expect(items.length).toBe(10);
    expect(
      screen.getByText("최대 10명까지 등록 가능합니다.")
    ).toBeInTheDocument();
  });

  /**
   * 5️⃣ 중복 이메일 제한
   */
  test("중복 이메일은 추가되지 않는다", async () => {
    const user = userEvent.setup();

    renderWithState({ course: mockCourse });

    const nameInput = screen.getByPlaceholderText("이름");
    const emailInput = screen.getByPlaceholderText("example2@domain.com");
    const addButton = screen.getByRole("button", { name: "추가하기" });

    await user.type(nameInput, "홍길동");
    await user.type(emailInput, "same@test.com");
    await user.click(addButton);

    await user.clear(nameInput);
    await user.type(nameInput, "김철수");

    await user.clear(emailInput);
    await user.type(emailInput, "same@test.com");
    await user.click(addButton);

    const items = screen.getAllByRole("listitem");

    expect(items.length).toBe(1);
    expect(screen.getByText("이메일이 중복되었습니다.")).toBeInTheDocument();
  });
});
