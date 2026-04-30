import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/common.css";
import "../css/courses.css";
import type { Course, CourseListResponse } from "../types/course";
import type {CourseProps} from "../tpyes/form"

export default function Courses({
  applicationType,
  setApplicationType, 
  setCourseData}: CourseProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const ctgImgs: string[] = ["🌐", "🎨", "⚙️", "📊", "🎯"];
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [personalActive, setPersonalActive] = useState<boolean>(true);
  const [groupActive, setGroupActive] = useState<boolean>(false);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    const start = (currentPage - 1) * 20;
    const end = start + 20;

    if (selectedCategory === "전체") {
      setPages(Math.ceil(courses.length / 20));

      return courses.slice(start, end);
    }

    const filtered = courses.filter(
      (course) => course.category === selectedCategory
    );

    setPages(Math.ceil(filtered.length / 20));

    const sliced = filtered.slice(start, end);

    return sliced;
  }, [courses, selectedCategory, currentPage]);

  const clickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://localhost:5173/courses");
      const data: CourseListResponse = await res.json();

      setCategories(data.categories);
      setCourses(data.courses);
    };
    fetchCourses();
  }, []);

  const calDates = (startDate: string, endDate: string) => {
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime();

    const diffDays = Math.floor(diff / (24 * 60 * 60 * 1000));

    return diffDays;
  };

  const handleSubmit = (course:Course) => {
    setCourseData(course);

    return applicationType === "personal"
     ? navigate("/enrollment-personal")
     : navigate("/enrollment-group")
  }

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
              setCurrentPage(1);
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
            <div className="course-description">{course.description}</div>
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
                    applicationType === "personal" ? "active" : ""
                  }`}
                  onClick={() => {
                    if (applicationType === "personal") return;

                    setApplicationType("personal");
                  }}
                >
                  개인
                </button>
                
                <button
                  className={`option ${
                    applicationType === "group" ? "active" : ""
                  }`}
                  onClick={() => {
                    if (applicationType === "group") return;

                    setApplicationType("group");
                  }}
                >
                  단체
                </button>
              </div>
              <button
                className="register-btn"
                onClick={() => {handleSubmit(course)}}
              >
                수강신청
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="courses-footer">
        <div className="courses-pages">
          <div
            className="page-number"
            style={{fontWeight: "bold"}}
            onClick={() => {
              if (currentPage === 1) return;

              setCurrentPage((prev) => prev - 1);
            }}
          >
            ⟨
          </div>
          {Array.from({ length: pages }, (_, i) => i + 1).map((i) => (
            <div
              className={`page-number ${currentPage === i ? "active" : ""}`}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </div>
          ))}
          <div
            className="page-number"
            style={{fontWeight: "bold"}}
            onClick={() => {
              if (currentPage === pages) return;

              setCurrentPage((prev) => prev + 1);
            }}
          >
            ⟩
          </div>
        </div>
      </div>
    </div>
  );
}
