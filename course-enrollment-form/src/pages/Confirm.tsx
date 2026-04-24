import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/confirm.css";

export default function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [popupApply, setPopupApply] = useState(false);
  const [popupPrivacy, setPopupPrivacy] = useState(false);
  const [allAgreement, setAllAgreement] = useState(false);
  const [applyAgreement, setApplyAgreement] = useState(false);
  const [privacyAgreement, setPrivacyAgreement] = useState(false);

  const { course, info } = location.state ?? {};

  const terms = [
    "수강신청은 신청서 작성 및 결제 완료시 최종 확정됩니다",
    "결제 완료 후에는 별도의 취소 요청이 없는 한 자동으로 수강이 시작됩니다",
  ];

  useEffect(() => {
    if (applyAgreement && privacyAgreement) {
      setAllAgreement(true);
      return;
    }
  }, [applyAgreement, privacyAgreement]);

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
            <span className="confirm-value">
              {course.price?.toLocaleString()}원
            </span>
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
            <p className="confirm-reason">
              {info.reason || "입력된 지원동기가 없습니다."}
            </p>
          </div>
        </section>

        <section className="confirm-section">
          <h2 className="confirm-section-title">이용약관</h2>

          <div className="confirm-row agreement">
            <label>
              <input
                className="Agreement-Checkbox"
                type="checkbox"
                checked={allAgreement}
                onChange={(e) => {
                  setAllAgreement(e.target.checked);
                  setApplyAgreement(e.target.checked);
                  setPrivacyAgreement(e.target.checked);
                }}
              />
              <span className="Agreement-Title">약관 전체동의</span>
            </label>
          </div>

          <div className="confirm-row">
            <label className="confirm-label-agreement">
              <input
                className="Agreement-Checkbox"
                type="checkbox"
                checked={applyAgreement}
                onChange={(e) => setApplyAgreement(e.target.checked)}
              />
              <span className="Agreement-Title">수강신청약관 동의</span>
              <span className="Agreement-Title required"> (필수)</span>
            </label>
            <span
              className="confirm-value-agreement"
              onClick={() => setPopupApply(true)}
            >
              ⟩
            </span>
          </div>

          <div className="confirm-row">
            <label className="confirm-label-agreement">
              <input
                className="Agreement-Checkbox"
                type="checkbox"
                checked={privacyAgreement}
                onChange={(e) => setPrivacyAgreement(e.target.checked)}
              />
              <span className="Agreement-Title">개인정보수집 동의</span>
              <span className="Agreement-Title required"> (필수)</span>
            </label>
            <span className="confirm-value-agreement">⟩</span>
          </div>
        </section>

        <div className="confirm-button-area">
          <button
            className="confirm-button secondary"
            onClick={() =>
              navigate("/enrollment-personal", { state: { course, info } })
            }
          >
            수정하기
          </button>
          <button className="confirm-button primary">최종 제출</button>
        </div>
      </main>

      {popupApply && (
        <div className="apply-terms-locate">
          <div className="apply-terms-layout">
            <div className="apply-terms-header">
              <div className="close-terms" onClick={() => setPopupApply(false)}>
                x
              </div>
              <div className="apply-terms-title">수강신청 약관</div>
              <div className="apply-terms-body"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
