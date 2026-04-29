import { useNavigate } from "react-router-dom";
import "../css/complete.css";
import type {CompleteProps} from "../types/form";

export default function Complete({
  applicationType,
  formData,
  setFormData,
  courseData,
  setCourseData
}:CompleteProps) {

  const currentDate = new Date().toISOString();
  const navigate = useNavigate();

  const createApplicationNo = () => {
    const date = new Date();
    const yyyymmdd = currentDate.slice(0, 10).replaceAll("-", "");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    return `APP-${yyyymmdd}-${random}`;
  };

  const goBackHome = () => {
    setCourseData({
      id: "",
      title: "",
      description: "",
      category: "",
      price: 0,
      maxCapacity: 0,
      currentEnrollment: 0,
      startDate: "",
      endDate: "",
      instructor: ""
    })
    applicationType === "personal" ? setFormData({
      name: "",
      email: "",
      phone: "",
      reason: "",
    })
    : setFormData({
      name: "",
      email: "",
      phone: "",
      reason: "",
      participants: [],
      representativePhoneNumber: "",
      groupName: ""
    })
    navigate("/courses")
  }

  return (
    <div className="Complete-Page">
      <div className="Complete-Header">
        <div className="Complete-Header-Title">신청완료</div>
      </div>
      <div className="Complete-Body">
        <div className="Complete-Show">
          <div className="Complete-Show-Layout">
            <div className="Complete-Registration-Row">
              <span className="Complete-Key">신청번호</span>
              <span className="Complete-Val">{createApplicationNo()}</span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">신청자</span>
              <span className="Complete-Val">{formData.name}</span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">강의제목</span>
              <span className="Complete-Val">{courseData.title}</span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">결제금액</span>
              <span className="Complete-Val">
                {applicationType === "personal" ? courseData.price.toLocaleString() 
                : (courseData?.price * formData?.participants.length).toLocaleString()}
              </span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">신청완료시간</span>
              <span className="Complete-Val">{currentDate}</span>
            </div>
          </div>
        </div>

        <div className="guide">
          <button className="backhome" onClick={goBackHome}>처음으로 돌아가기</button>
        </div>
      </div>
    </div>
  );
}
