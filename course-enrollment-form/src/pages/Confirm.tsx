import { useLocation, useNavigate } from "react-router-dom";
import "../css/confirm.css";

export default function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();

  const {course, info} = location.state ?? {};

  return (
    <div className="confirm-homepage">
      <header className="confirm-header">
        <h1 className="confirm-title">지원서 미리보기</h1>
        <p className="confirm-subtitle">입력하신 정보를 확인해주세요.</p>
      </header>

      <main className="confirm-card">
        <section className="confirm-section">
          <h2 className="confirm-section-title">강의 정보</h2>

          <div className="confirm-row">
            <span className="confirm-label">강의명</span>
            <span className="confirm-value">{course.title}</span>
          </div>

          <div className="confirm-row">
            <span className="confirm-label">강사</span>
            <span className="confirm-value">{course.instructor}</span>
          </div>

          <div className="confirm-row">
            <span className="confirm-label">수강료</span>
            <span className="confirm-value">{course.price?.toLocaleString()}원</span>
          </div>
        </section>

        <section className="confirm-section">
          <h2 className="confirm-section-title">지원자 정보</h2>

          <div className="confirm-row">
            <span className="confirm-label">이름</span>
            <span className="confirm-value">{info.name}</span>
          </div>

          <div className="confirm-row">
            <span className="confirm-label">이메일</span>
            <span className="confirm-value">{info.email}</span>
          </div>

          <div className="confirm-row">
            <span className="confirm-label">연락처</span>
            <span className="confirm-value">{info.phone}</span>
          </div>

          <div className="confirm-reason-box">
            <span className="confirm-label">지원동기</span>
            <p className="confirm-reason">{info.reason || "입력된 지원동기가 없습니다."}</p>
          </div>
        </section>

        <div className="confirm-button-area">
          <button 
            className="confirm-button secondary"
            onClick={() => navigate("/enrollment-personal", {state: {course, info}})}
            >수정하기</button>
          <button className="confirm-button primary">최종 제출</button>
        </div>
      </main>
    </div>
  );
}