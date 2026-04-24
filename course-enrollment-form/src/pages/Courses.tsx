import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/common.css";
import "../css/courses.css";
import type { Course, CourseListResponse } from "../types/course";

export default function Courses() {
  const [categories, setCategories] = useState<string[]>([]);
  const ctgImgs: string[] = ["🌐", "🎨", "⚙️", "📊", "🎯"];
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [courses, setCourses] = useState<Course[]>([]);
  const [personalActive, setPersonalActive] = useState<boolean>(true);
  const [groupActive, setGroupActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "전체") return courses;

    return courses.filter((course) => course.category === selectedCategory);
  }, [courses, selectedCategory]);

  const clickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://localhost:5175/courses");
      const data: CourseListResponse = await res.json();

      setCategories(data.categories);
      setCourses(data.courses);
    };
    fetchCourses();
  }, []);

  const calDates = (startDate, endDate) => {
    const diff = new Date(endDate) - new Date(startDate);
    const diffDays = Math.floor(diff / (24 * 60 * 60 * 1000));

    return diffDays;
  };

  return (
    <div className="page">
      <div className="categories">
        {categories.map((category, idx) => (
          <div
            className={`category ${
              selectedCategory === category ? "active" : ""
            }`}
            key={idx}
            onClick={() => {
              clickCategory(category);
            }}
          >
            <div className="category-img">{ctgImgs[idx]}</div>
            <div
              className={`category-txt ${
                selectedCategory === category ? "active" : ""
              }`}
            >
              {category}
            </div>
          </div>
        ))}
      </div>
      <div className="lectures">
        {filteredCourses.map((course, idx) => (
          <div className="course" key={idx}>
            <div className="title">{course.title}</div>
            <div className="description">{course.description}</div>
            <div className="instructor">{course.instructor}</div>
            <div className="price">₩{course.price.toLocaleString()}</div>
            <div className="status">
              <span className="key">최대수용 인원:</span>
              <span className="value"> {course.maxCapacity}</span>
              <span className="key"> 현재 등록:</span>
              <span className="value"> {course.currentEnrollment}</span>
            </div>
            <div className="date-scope">
              <span>등록기간: </span>
              <span>
                {course.startDate.split("T")[0]}~{course.endDate.split("T")[0]}
              </span>
            </div>
            <div className="hover-box">
              <h3>{course.title}</h3>
              <p style={{ lineHeight: 1.2 }}>{course.description}</p>
              <div style={{ fontSize: 16 }}>
                남은 자리: {course.maxCapacity - course.currentEnrollment}
              </div>
              <div style={{ fontSize: 16 }}>
                남은 일: {calDates(course.startDate, course.endDate)}
              </div>
              <div style={{ fontSize: 16 }}>
                가격: ₩{course.price.toLocaleString()}
              </div>
              <div className="option-group">
                <button
                  className={`option ${
                    personalActive && !groupActive ? "personal-active" : ""
                  }`}
                  onClick={() => {
                    if (personalActive) return;

                    setPersonalActive((prev) => !prev);
                    setGroupActive(false);
                  }}
                >
                  개인 선택
                </button>
                <button
                  className={`option ${
                    groupActive && !personalActive ? "group-active" : ""
                  }`}
                  onClick={() => {
                    if (groupActive) return;

                    setGroupActive((prev) => !prev);
                    setPersonalActive(false);
                  }}
                >
                  단체 선택
                </button>
              </div>
              <button
                className="register-btn"
                onClick={() => {
                  personalActive
                    ? navigate("/enrollment-personal", { state: { course } })
                    : navigate("/enrollment-group");
                }}
              >
                수강신청
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
