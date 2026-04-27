// PersonalRegistrationForm.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PersonalRegistrationForm from "../pages/PersonalRegistrationForm";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCourse = {
  id: "course-1",
  title: "React 강의",
  description: "React 강의 설명",
  category: "개발",
  instructor: "홍길동",
  price: 10000,
  maxCapacity: 10,
  currentEnrollment: 3,
  startDate: "2026-05-01T00:00:00.000Z",
  endDate: "2026-05-10T00:00:00.000Z",
};

const renderPage = (state?: unknown) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/enrollment-personal", state }]}>
      <PersonalRegistrationForm />
    </MemoryRouter>
  );
};

describe("PersonalRegistrationForm", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("course가 없으면 잘못된 접근 메시지를 보여준다", () => {
    renderPage();

    expect(screen.getByText("잘못된 접근입니다.")).toBeInTheDocument();
  });

  it("course 정보가 있으면 강의 제목을 보여준다", () => {
    renderPage({ course: mockCourse });

    expect(screen.getByText("React 강의")).toBeInTheDocument();
  });

  it("필수값 없이 제출하면 에러 메시지를 보여준다", async () => {
    renderPage({ course: mockCourse });

    fireEvent.click(screen.getByRole("button", { name: "제출하기" }));

    expect(await screen.findAllByText("필수 응답 항목입니다.")).toHaveLength(3);
    expect(
      screen.getByText("필수 항목을 모두 입력해 주세요.")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("이메일 형식이 올바르지 않으면 에러 메시지를 보여준다", async () => {
    renderPage({ course: mockCourse });

    fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), {
      target: { value: "홍길동" },
    });

    fireEvent.change(screen.getByPlaceholderText("example@domain.com"), {
      target: { value: "wrong-email" },
    });

    fireEvent.change(screen.getByPlaceholderText("01012345678"), {
      target: { value: "01012345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: "제출하기" }));

    expect(
      await screen.findByText("이메일 형식이 올바르지 않습니다.")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("전화번호 형식이 올바르지 않으면 에러 메시지를 보여준다", async () => {
    renderPage({ course: mockCourse });

    fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), {
      target: { value: "홍길동" },
    });

    fireEvent.change(screen.getByPlaceholderText("example@domain.com"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("01012345678"), {
      target: { value: "0101234" },
    });

    fireEvent.click(screen.getByRole("button", { name: "제출하기" }));

    expect(
      await screen.findByText("전화번호 형식이 올바르지 않습니다.")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("정상 입력 후 제출하면 confirm 페이지로 이동한다", async () => {
    renderPage({ course: mockCourse });

    fireEvent.change(screen.getByPlaceholderText("내용을 입력해주세요."), {
      target: { value: "홍길동" },
    });

    fireEvent.change(screen.getByPlaceholderText("example@domain.com"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("01012345678"), {
      target: { value: "01012345678" },
    });

    fireEvent.change(screen.getByPlaceholderText("지원동기를 입력해주세요."), {
      target: { value: "React를 배우고 싶습니다." },
    });

    fireEvent.click(screen.getByRole("button", { name: "제출하기" }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/confirm", {
        state: {
          info: {
            name: "홍길동",
            email: "test@example.com",
            phone: "01012345678",
            reason: "React를 배우고 싶습니다.",
          },
          course: mockCourse,
        },
      });
    });
  });

  it("지원동기 글자 수를 보여준다", () => {
    renderPage({ course: mockCourse });

    fireEvent.change(screen.getByPlaceholderText("지원동기를 입력해주세요."), {
      target: { value: "안녕하세요" },
    });

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("/ 300")).toBeInTheDocument();
  });

  it("그룹 신청으로 전환을 누르면 그룹 신청 페이지로 이동한다", () => {
    renderPage({ course: mockCourse });

    fireEvent.click(screen.getByText("그룹 신청으로 전환"));

    expect(mockNavigate).toHaveBeenCalledWith("/enrollment-group", {
      state: { course: mockCourse },
    });
  });

  it("이전으로를 누르면 courses 페이지로 이동한다", () => {
    renderPage({ course: mockCourse });

    fireEvent.click(screen.getByText("이전으로"));

    expect(mockNavigate).toHaveBeenCalledWith("/courses");
  });
});