import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/enrollment.css";
import type { Course } from "../types/course";
import type { GroupFormValues, GroupProps } from "../types/form";
import type { Info } from "../types/info";
import type { Participant } from "../types/participant";

export default function GroupRegistrationForm({
  formData,
  setFormData,
  applicationType,
  setApplicationType,
  courseData
}: GroupProps) {
  const navigate = useNavigate();

  const [participants, setParticipants] =
   useState<Map<string, Participant>>(new Map(formData.participants) ?? new Map());

  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailDuplicateError, setEmailDuplicateError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<GroupFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: formData.name ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
      reason: formData.reason ?? "",
      groupName: formData.groupName ?? "",
      representativePhoneNumber: formData.representativePhoneNumber ?? "",
      participants: formData.participants ?? new []
    }
  });

  const reason = watch("reason") ?? "";

  if (!courseData.title) {
    return <div style={{ userSelect: "none", fontSize: 14, fontWeight: "bold", padding: 30  }}>잘못된 접근입니다.</div>;
  }

  const deadline = "마감: ";
  const possibleSeat = "가능인원: ";

  const onSubmit = (data: GroupFormValues) => {
    if (participants.size < 2) {
      setShowSubmitError(true);

      setTimeout(() => {
        setShowSubmitError(false);
      }, 2500);

      return;
    }

    setFormData({...data, participants: Array.from(participants.values())});

    navigate("/confirm")
  };

  const onInvalid = () => {
    setShowSubmitError(true);

    setTimeout(() => {
      setShowSubmitError(false);
    }, 2500);
  };

  const handleAddBtn = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!addEmail.trim() || !addName.trim()) {
      setEmptyError(true);
      setEmailError(false);
      setEmailDuplicateError(false);
      setSizeError(false);
      return;
    }

    if (participants.size === 10) {
      setSizeError(true);
      setEmailError(false);
      setEmptyError(false);
      setEmailDuplicateError(false);
      return;
    }

    if (!emailRegex.test(addEmail)) {
      setEmailError(true);
      setEmptyError(false);
      setEmailDuplicateError(false);
      setSizeError(false);
      return;
    }

    if (participants.has(addEmail)) {
      setEmailDuplicateError(true);
      setEmptyError(false);
      setSizeError(false);
      setEmailError(false);
      return;
    }

    setParticipants((prev) => {
      const next = new Map(prev);
      next.set(addEmail, { email: addEmail, name: addName });
      return next;
    });

    setAddEmail("");
    setAddName("");
    setEmailDuplicateError(false);
    setEmailError(false);
    setEmptyError(false);
    setSizeError(false);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("T")[0].split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    return `${month}/${day}(${days[date.getDay()]})`;
  };

  const handleTransition = () => {
    console.log("dfdf")
    setApplicationType("personal");
    navigate("/enrollment-personal");
  }

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
                onClick={handleTransition}
              >
                개인 신청으로 전환
              </span>
              <span>⟩</span>
            </div>
          </div>

          <div className="apply-header-bottom">
            <h1 className="apply-heading">단체 지원서 작성</h1>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">신청자</div>
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
                    message: "신청자는 2자 이상 입력해주세요.",
                  },
                  maxLength: {
                    value: 10,
                    message: "10자까지 입력 가능합니다.",
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
              <div className="form-label">단체명</div>
              <div className="form-required">·</div>
            </div>

            <div className="form-input-wrapper">
              <input
                type="text"
                maxLength={20}
                className="form-input"
                placeholder="내용을 입력해주세요."
                {...register("groupName", {
                  required: "필수 응답 항목입니다.",
                  minLength: {
                    value: 2,
                    message: "단체명은 2자 이상 입력해주세요.",
                  },
                })}
              />

              {errors.groupName && (
                <p className="error">{errors.groupName.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <span className="form-label">신청 인원수</span>
              <span className="description">
                (최소 2명, 최대 10명까지 등록가능합니다.)
              </span>
            </div>

            <div className="add-participant">
              <div className="box">{participants.size}</div>
            </div>

            <div className="email-name-layout">
              <input
                className="email-name"
                value={addName}
                minLength={2}
                maxLength={10}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="이름"
              />

              <input
                className="email-name"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="example2@domain.com"
              />

              <button type="button" className="addBtn" onClick={handleAddBtn}>
                추가하기
              </button>

              {emailError ? (
                <div className="error-message">
                  이메일 형식이 올바르지 않습니다.
                </div>
              ) : emailDuplicateError ? (
                <div className="error-message">이메일이 중복되었습니다.</div>
              ) : sizeError ? (
                <div className="error-message">
                  최대 10명까지 등록 가능합니다.
                </div>
              ) : emptyError ? (
                <div className="error-message">
                  이름과 이메일은 필수값입니다.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">참가인원</div>
            </div>

            <div className="form-input-wrapper">
              <ol className="participants">
                {Array.from(participants).map(([key, val]) => (
                  <li className="bundle" key={key}>
                    <span className="addedInfo">
                      {`${val.name}(${val.email})`}
                    </span>

                    <div
                      className="delete"
                      onClick={() => {
                        setParticipants((prev) => {
                          const next = new Map(prev);
                          next.delete(key);
                          return next;
                        });
                      }}
                    >
                      x
                    </div>
                  </li>
                ))}
              </ol>

              {participants.size > 0 && participants.size < 2 && (
                <p className="error">참가자는 최소 2명 이상 등록해주세요.</p>
              )}
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

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">담당자 연락처</div>
              <div className="form-required">·</div>
            </div>

            <div className="form-input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="01012345678"
                {...register("representativePhoneNumber", {
                  required: "필수 응답 항목입니다.",
                  pattern: {
                    value: /^010\d{8}$/,
                    message: "전화번호 형식이 올바르지 않습니다.",
                  },
                  onChange: (e) => {
                    const onlyNumber = e.target.value.replace(/\D/g, "");
                    setValue("representativePhoneNumber", onlyNumber, {
                      shouldValidate: true,
                    });
                  },
                })}
              />

              {errors.representativePhoneNumber && (
                <p className="error">
                  {errors.representativePhoneNumber.message}
                </p>
              )}
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
