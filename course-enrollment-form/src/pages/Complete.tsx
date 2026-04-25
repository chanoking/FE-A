import { useLocation } from "react-router-dom";
import "../css/complete.css";
import type { Course } from "../types/course";
import type { Info } from "../types/info";

export default function Complete() {
  const location = useLocation();
  const { course, info } =
    (location.state as { course?: Course; info?: Info }) ?? {};
  const currentDate = new Date().toISOString();

  const createApplicationNo = () => {
    const date = new Date();
    const yyyymmdd = currentDate.slice(0, 10).replaceAll("-", "");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    return `APP-${yyyymmdd}-${random}`;
  };

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
              <span className="Complete-Val">{info.name}</span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">강의제목</span>
              <span className="Complete-Val">{course.title}</span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">결제금액</span>
              <span className="Complete-Val">
                {course.price.toLocaleString()}
              </span>
            </div>

            <div className="Complete-Registration-Row">
              <span className="Complete-Key">신청완료시간</span>
              <span className="Complete-Val">{currentDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
