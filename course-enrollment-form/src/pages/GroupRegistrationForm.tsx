import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/enrollment.css";
import type { Course } from "../types/course";
import type { Info } from "../types/info";
import type { Participant } from "../types/participant";

export default function GroupRegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, info } =
    (location.state as { course?: Course; info?: Info }) ?? {};

  const [name, setName] = useState(!info ? "" : info.name);
  const [email, setEmail] = useState(!info ? "" : info.email);
  const [phone, setPhone] = useState(!info ? "" : info.phone);
  const [reason, setReason] = useState(!info ? "" : info.reason);
  const [groupName, setGroupName] = useState(!info ? "" : info.groupName);

  const [touchedOutsideName, setTouchedOutsideName] = useState(false);
  const [touchedOutsideEmail, setTouchedOutsideEmail] = useState(false);
  const [touchedOutsidePhone, setTouchedOutsidePhone] = useState(false);
  const [touchedOutsideGroup, setTouchedOutsideGroup] = useState(false);

  const [textCnt, setTextCnt] = useState(0);
  const [participants, setParticipants] = useState<Map<string, Participant>>(
    new Map()
  );
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailDuplicateError, setEmailDuplicateError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const [showSubmitError, setShowSubmitError] = useState(false);

  if (!course) {
    return <div style={{ userSelect: "none" }}>잘못된 접근입니다.</div>;
  }

  const deadline = "마감: ";
  const possibleSeat = "가능인원: ";

  const handleSubmit = () => {
    const hasError =
      !name.trim() ||
      !email.trim() ||
      !emailValidation(email) ||
      !phone.trim() ||
      !validPhoneNumber(phone);

    if (hasError) {
      setTouchedOutsideName(true);
      setTouchedOutsideEmail(true);
      setTouchedOutsidePhone(true);

      setShowSubmitError(true);

      setTimeout(() => {
        setShowSubmitError(false);
      }, 2500);

      return;
    }

    navigate("/confirm", {
      state: {
        info: {
          name,
          email,
          phone,
          reason,
        },
        course,
      },
    });
  };

  const handleAddBtn = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!addEmail || !addName) {
      setEmptyError(true);
      setEmailError(false);
      setEmailDuplicateError(false);
      return;
    }
    if (!emailRegex.test(addEmail)) {
      setEmailError(true);
      setEmptyError(false);
      setEmailDuplicateError(false);
      return;
    }

    if (participants.has(addEmail)) {
      setEmailDuplicateError(true);
      setEmptyError(false);
      setEmailError(false);
      return;
    }
    if (emailRegex.test(addEmail) && !participants.has(addEmail)) {
      setParticipants((prev) =>
        prev.set(addEmail, { name: addName, email: addEmail })
      );
      setAddEmail("");
      setAddName("");
      setEmailDuplicateError(false);
      setEmailError(false);
      setEmptyError(false);
    }
  };
  const emailValidation = (email: string) => {
    if (!email) return true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value?.replace(/\D/g, "") || "";

    setPhone(onlyNumber);
  };

  const validPhoneNumber = (number: string) => {
    if (!number) return true;

    return /^010\d{8}$/.test(number);
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
                minLength={2}
                className="form-input"
                placeholder="내용을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => {
                  if (name) {
                    setTouchedOutsideName(false);
                    return;
                  }
                  setTouchedOutsideName(true);
                }}
              />
              {touchedOutsideName && (
                <p className="error">필수 응답 항목입니다.</p>
              )}
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
                minLength={2}
                className="form-input"
                placeholder="내용을 입력해주세요."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                onBlur={() => {
                  if (groupName) {
                    setTouchedOutsideGroup(false);
                    return;
                  }
                  setTouchedOutsideGroup(true);
                }}
              />

              {touchedOutsideGroup && !email && (
                <p className="error">필수 응답 항목입니다.</p>
              )}
            </div>
          </div>
        </div>

        <div className="apply-form">
          <div className="form-field">
            <div className="form-label-row">
              <div className="form-label">신청 인원수</div>
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
                placeholder="example@domain.com"
              />
              <button className="addBtn" onClick={handleAddBtn}>
                추가하기
              </button>
              {emailError ? (
                <div className="error-message">
                  이메일 형식이 올바르지 않습니다.
                </div>
              ) : emailDuplicateError ? (
                <div className="error-message">이메일이 중복되었습니다.</div>
              ) : (
                <div className="error-message">
                  이메일과 이름은 필수값입니다.
                </div>
              )}
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
                  <div className="bundle" key={key}>
                    <li className="addedInfo">{`${val.name}(${val.email})`}</li>
                    <div
                      className="delete"
                      onClick={() => {
                        participants.delete(key);
                        setParticipants((prev) => new Map(Array.from(prev)));
                      }}
                    >
                      x
                    </div>
                  </div>
                ))}
              </ol>
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
                value={reason}
                onChange={(e) => {
                  const value = e.target.value;
                  setReason(value);
                  setTextCnt(value.length);
                }}
              />
              <div className="countChars">
                <span className="display-cnt">{textCnt}</span>
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
                  {formatDate(course.endDate)}
                </span>
                <span className="info">
                  {possibleSeat}
                  {course.maxCapacity - course.currentEnrollment}
                </span>
              </div>

              <div className="FooterApply-Btn">
                <button className="Apply-Btn" onClick={handleSubmit}>
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
