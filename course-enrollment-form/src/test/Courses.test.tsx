// Courses.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Courses from "../pages/Courses";

const mockNavigate = vi.fn();
const setCourseData = vi.fn();
const setApplicationType = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCourses = [
  {
    id: "1",
    title: "React 강의",
    description: "React 기초 강의입니다.",
    category: "개발",
    instructor: "김개발",
    price: 100000,
    maxCapacity: 10,
    currentEnrollment: 3,
    startDate: "2026-05-01T00:00:00.000Z",
    endDate: "2026-05-10T00:00:00.000Z",
  },
  {
    id: "2",
    title: "UI 디자인 강의",
    description: "디자인 기초 강의입니다.",
    category: "디자인",
    instructor: "이디자인",
    price: 80000,
    maxCapacity: 5,
    currentEnrollment: 5,
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-06-05T00:00:00.000Z",
  },
];

const mockResponse = {
  categories: ["전체", "개발", "디자인"],
  courses: mockCourses,
};

const renderCourses = () => {
  return render(
    <MemoryRouter>
      <Courses
        applicationType="personal"
        setApplicationType={setApplicationType} 
        courseData={null}
        setCourseData={setCourseData}
        />
    </MemoryRouter>
  );
};

describe("Courses", () => {
  beforeEach(() => {
    mockNavigate.mockClear();

    globalThis.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    }) as unknown as typeof fetch;

    window.alert = vi.fn();
  });

  it("강의 목록을 fetch해서 화면에 보여준다", async () => {
    renderCourses();

    const items = await screen.findAllByText("React 강의");

    expect(items[0]).toBeInTheDocument();

    const itemsB = await screen.findAllByText("UI 디자인 강의")

    expect(itemsB[0]).toBeInTheDocument();

    expect(screen.getByText("김개발")).toBeInTheDocument();
    expect(screen.getByText("이디자인")).toBeInTheDocument();
  });

  it("카테고리 목록을 보여준다", async () => {
    renderCourses();

    expect(await screen.findByText("전체")).toBeInTheDocument();
    expect(screen.getByText("개발")).toBeInTheDocument();
    expect(screen.getByText("디자인")).toBeInTheDocument();
  });

  it("카테고리를 클릭하면 해당 카테고리 강의만 보여준다", async () => {
    renderCourses();

    fireEvent.click(await screen.findByText("개발"));

    const items = await screen.findAllByText("React 강의");

    expect(items[0]).toBeInTheDocument();
    expect(screen.queryByText("UI 디자인 강의")).not.toBeInTheDocument();
  });

  it("개인 선택 상태에서 수강신청을 누르면 개인 신청 페이지로 이동한다", async () => {
    renderCourses();

    await screen.findAllByText("React 강의");

    const registerButtons = screen.getAllByRole("button", {
      name: "수강신청",
    });

    fireEvent.click(registerButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/enrollment-personal");
  });

  it("단체 선택 후 수강신청을 누르면 단체 신청 페이지로 이동한다", async () => {
    renderCourses();

    await screen.findAllByText("React 강의");

    const groupButtons = screen.getAllByRole("button", {
      name: "단체",
    });

    fireEvent.click(groupButtons[0]);

    const registerButtons = screen.getAllByRole("button", {
      name: "수강신청",
    });

    fireEvent.click(registerButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/enrollment-group");
  });

  it("정원이 가득 찬 강의는 수강신청 시 alert를 보여주고 이동하지 않는다", async () => {
    renderCourses();

    await screen.findAllByText("UI 디자인 강의");

    const registerButtons = screen.getAllByRole("button", {
      name: "수강신청",
    });

    fireEvent.click(registerButtons[1]);

    expect(window.alert).toHaveBeenCalledWith("가득 찼습니다.");
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("가격을 천 단위 콤마로 보여준다", async () => {
    renderCourses();

    expect(await screen.findByText("₩100,000")).toBeInTheDocument();
    expect(screen.getByText("₩80,000")).toBeInTheDocument();
  });

  it("등록 기간을 보여준다", async () => {
    renderCourses();

    expect(
      await screen.findByText("2026-05-01~2026-05-10")
    ).toBeInTheDocument();

    expect(screen.getByText("2026-06-01~2026-06-05")).toBeInTheDocument();
  });
});