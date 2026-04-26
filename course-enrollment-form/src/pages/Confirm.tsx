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
  const [showSubmitError, setShowSubmitError] = useState(false);

  const { course, info } = location.state ?? {};

  const [option, setOption] = useState(
    info.representativePhoneNumber ? "group" : "personal"
  );

  useEffect(() => {
    if (applyAgreement && privacyAgreement) {
      setAllAgreement(true);
      return;
    }
  }, [applyAgreement, privacyAgreement]);

  const handleSubmit = () => {
    if (!allAgreement) {
      setShowSubmitError(true);

      setTimeout(() => {
        setShowSubmitError(false);
      }, 2500);

      return;
    }

    navigate("/complete", { state: { course, info } });
  };

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
          <h2 className="confirm-section-title">신청 인원</h2>
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
            <span
              className="confirm-value-agreement"
              onClick={() => setPopupPrivacy(true)}
            >
              ⟩
            </span>
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
          <button className="confirm-button primary" onClick={handleSubmit}>
            최종 제출
          </button>
        </div>
      </main>

      {showSubmitError && (
        <div className="confirm-toast-area">
          <div className="confirm-toast-error">⚠️ 이용약관을 확인해주세요.</div>
        </div>
      )}

      {popupApply && (
        <div className="apply-terms-locate">
          <div className="apply-terms-layout">
            <div className="apply-terms-header">
              <div className="close-terms" onClick={() => setPopupApply(false)}>
                x
              </div>
              <div className="apply-terms-title">수강신청 약관</div>
              <div className="apply-terms-body">
                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">
                    1. 수강신청 및 계약 성립
                  </div>
                  <div className="apply-terms-part-item">
                    • 이용자는 본 약관에 동의하고 수강신청을 완료함으로써 강의
                    이용 계약이 성립된니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 수강신청은 결제 완료 시 최종 확정됩니다.
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">2. 강의 이용</div>
                  <div className="apply-terms-part-item">
                    • 수강자는 신청한 강의를 정해진 기간 동안 이용할 수
                    있습니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 강의는 개인 학습용으로만 제공되며, 타인에게 계정을
                    공유하거나 양도할 수 없습니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 강의 영상, 자료의 무단 복제, 녹화, 배포를 금지합니다.
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">3. 수강기간</div>
                  <div className="apply-terms-part-item">
                    • 강의별 수강 가능 기간은 별도로 안내됩니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 수강기간이 종료되면 강의 이용이 제한됩니다.
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">
                    4. 결제 및 환불 정책
                  </div>
                  <div className="apply-terms-part-item">
                    • 결제 완료 후 강의 이용이 가능합니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 환불은 아래 기준에 따릅니다:
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-item">
                    • 강의 시작 전: 전액 환불
                  </div>
                  <div className="apply-terms-part-item">
                    • 강의 시작 후 7일 이내 및 진도 20% 미만: 50% 환불
                  </div>
                  <div className="apply-terms-part-item">
                    • 그 이후: 환불 불가
                  </div>
                </div>

                <div className="apply-terms-closing">
                  <span className="closing-phrase">
                    해당 이용사항에 동의합니다.
                  </span>
                  <input
                    type="checkbox"
                    checked={applyAgreement}
                    onChange={(e) => setApplyAgreement(e.target.checked)}
                  />
                </div>

                <button
                  className="confirm-btn"
                  onClick={() => {
                    setPopupApply(false);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {popupPrivacy && (
        <div className="apply-terms-locate">
          <div className="apply-terms-layout">
            <div className="apply-terms-header">
              <div className="close-terms" onClick={() => setPopupApply(false)}>
                x
              </div>
              <div className="apply-terms-title">
                개인정보 수집 및 이용 동의
              </div>
              <div className="apply-terms-body">
                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">1. 수집항목</div>
                  <div className="apply-terms-part-item">
                    • 회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수
                    있습니다.
                  </div>
                  <div className="detail">
                    <p className="detail-p">필수항목: 이름, 이메일, 연락처</p>
                    <p className="detail-p">
                      선택항목: 추가 요청 정보(선택 입력 시)
                    </p>
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">
                    2. 수집 및 이용 목적
                  </div>
                  <div className="apply-terms-part-item">
                    • 수집된 개인정보는 다음의 목적을 위해 사용됩니다.
                  </div>
                  <div className="detail">
                    <p className="detail-p">수강신청 및 결제 처리</p>
                    <p className="detail-p">강의 안내 및 공지사항 전달</p>
                    <p className="detail-p">고객 문의 대응 및 서비스 지원</p>
                    <p className="detail-p">서비스 개선 및 운영 관리</p>
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">
                    3. 보유 및 이용기간
                  </div>
                  <div className="apply-terms-part-item">
                    • 수집된 개인정보는 이용 목적 달성 시 보관됩니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 관련 법령에 따라 일정 기간 보관이 필요할 경우 해당 기간
                    동안 보관됩니다.
                  </div>
                </div>

                <div className="apply-terms-part">
                  <div className="apply-terms-part-title">
                    4. 동의 거부 권리 및 불이익
                  </div>
                  <div className="apply-terms-part-item">
                    • 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 수
                    있습니다.
                  </div>
                  <div className="apply-terms-part-item">
                    • 단, 필수 항목에 대한 동의를 거부할 경우 서비스 이용이
                    제한될 수 있습니다.
                  </div>
                </div>

                <div className="apply-terms-closing">
                  <span className="closing-phrase">
                    해당 이용사항에 동의합니다.
                  </span>
                  <input
                    type="checkbox"
                    checked={privacyAgreement}
                    onChange={(e) => setPrivacyAgreement(e.target.checked)}
                  />
                </div>

                <button
                  className="confirm-btn"
                  onClick={() => {
                    setPopupPrivacy(false);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
