import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/enrollment.css";
import type { Course } from "../types/course";
import type { PersonalFormValues, PersonalProps } from "../types/form";
import type { Info } from "../types/info";

export default function PersonalRegistrationForm({
  formData,
  setFormData,
  applicationType,
  setApplicationType,
  courseData
}: PersonalProps) {
  const navigate = useNavigate();

  const [showSubmitError, setShowSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: formData?.name ?? "",
      email: formData?.email ?? "",
      phone: formData?.phone,
      reason: formData?.reason,
    },
  });

  const reason = watch("reason") ?? "";

  if (!courseData) {
    return <div style={{ userSelect: "none" }}>잘못된 접근입니다.</div>;
  }

  const deadline = "마감: ";
  const possibleSeat = "가능인원: ";

  const onSubmit = (data: PersonalFormValues) => {
    setFormData(data);

    navigate("/confirm");
  };

  const onInvalid = () => {
    setShowSubmitError(true);

    setTimeout(() => {
      setShowSubmitError(false);
    }, 2500);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    return `${month}/${day}(${days[date.getDay()]})`;
  };

  return (
    <div className="enrollment-page">
      <div className="enrollment-header">
        <h2 className="enrollment-title">{courseData.title}</h2>
      </div>

      <div className="apply-layout">
        <div className="apply-header">
          <div className="added-function">
            <div
              className="apply-header-back"
              onClick={() => navigate("/courses")}
            >
              <span>〈</span>
              <span className="apply-header-back-text">이전으로</span>
            </div>

            <div className="transition">
              <span
                className="transition-to-group"
                onClick={() => {
                  navigate("/enrollment-group");
                }}
              >
                그룹 신청으로 전환
              </span>
              <span>⟩</span>
            </div>
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
                maxLength={20}
                className="form-input"
                placeholder="내용을 입력해주세요."
                {...register("name", {
                  required: "필수 응답 항목입니다.",
                  minLength: {
                    value: 2,
                    message: "이름은 2자 이상 입력해주세요.",
                  },
                })}
              />

              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">이메일</div>
              <div className="form-required">·</div>
            </div>

            <div className="form-input-wrapper">
              <input
                type="email"
                className="form-input"
                placeholder="example@domain.com"
                {...register("email", {
                  required: "필수 응답 항목입니다.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "이메일 형식이 올바르지 않습니다.",
                  },
                })}
              />

              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">연락처</div>
              <div className="form-required">·</div>
            </div>

            <div className="form-input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="01012345678"
                {...register("phone", {
                  required: "필수 응답 항목입니다.",
                  pattern: {
                    value: /^010\d{8}$/,
                    message: "전화번호 형식이 올바르지 않습니다.",
                  },
                  onChange: (e) => {
                    const onlyNumber = e.target.value.replace(/\D/g, "");
                    setValue("phone", onlyNumber, {
                      shouldValidate: true,
                    });
                  },
                })}
              />

              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">지원동기</div>
            </div>

            <div className="form-input-wrapper-reason">
              <textarea
                className="form-input reason"
                maxLength={300}
                placeholder="지원동기를 입력해주세요."
                {...register("reason")}
              />

              <div className="countChars">
                <span className="display-cnt">{reason.length}</span>
                <span className="max-cnt"> / 300</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ApplyFormFooter-Layout">
          <div className="ApplyFormStickyFooter">
            <div className="ApplyFormFooter">
              <div className="footer-information">
                <span className="info">
                  {deadline}
                  {formatDate(courseData.endDate)}
                </span>
                <span className="info">
                  {possibleSeat}
                  {courseData.maxCapacity - courseData.currentEnrollment}
                </span>
              </div>

              <div className="FooterApply-Btn">
                <button
                  type="button"
                  className="Apply-Btn"
                  onClick={handleSubmit(onSubmit, onInvalid)}
                >
                  제출하기
                </button>
              </div>
            </div>
          </div>

          <div className="footer-toast-area">
            {showSubmitError && (
              <div className="footer-toast-error">
                <span>⚠️</span>
                <span>필수 항목을 모두 입력해 주세요.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
