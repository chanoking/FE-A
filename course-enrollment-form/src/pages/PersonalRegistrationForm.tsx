import { useLocation, useNavigate } from "react-router-dom";
import "../css/enrollment.css";
import type { Course } from "../types/course";

export default function PersonalRegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = (location.state as { course?: Course }) ?? {};

  if (!course) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="enrollment-page">
      <div className="enrollment-header">
        <h2 className="enrollment-title">{course.title}</h2>
      </div>

      <div className="apply-layout">
        <div className="apply-header">
          <div
            className="apply-header-back"
            onClick={() => navigate("/courses")}
          >
            <span>〈</span>
            <span className="apply-header-back-text">이전으로</span>
          </div>

          <div className="apply-header-bottom">
            <h1 className="apply-heading">지원서 작성</h1>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">이름</div>
              <div className="form-required">·</div>
            </div>

            <div className="form-input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="내용을 입력해주세요."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
