import type { Dispatch, SetStateAction } from "react";
import type { Participant } from "./participant";

export type CourseValues = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  instructor: string;
}

export type PersonalFormValues = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

export type GroupFormValues = PersonalFormValues & {
  participants: Participant[];
  representativePhoneNumber: string;
  groupName: string;
};

export type CourseProps = {
  applicationType: ApplicationType;
  setApplicationType: Dispatch<SetStateAction<ApplicationType>>;
  courseData: CourseValues;
  setCourseData: Dispatch<SetStateAction<CourseValues>>;
}

export type ApplicationType = "personal" | "group";

export type PersonalProps = {
  formData: PersonalFormValues;
  setFormData: Dispatch<SetStateAction<PersonalFormValues>>;
  applicationType: ApplicationType;
  setApplicationType: Dispatch<SetStateAction<ApplicationType>>;
  courseData: CourseValues;
};

export type GroupProps = {
  formData: GroupFormValues;
  setFormData: Dispatch<SetStateAction<GroupFormValues>>;
  applicationType: ApplicationType;
  setApplicationType: Dispatch<SetStateAction<ApplicationType>>;
  courseData: CourseValues;
};

export type ConfirmProps =
  | {
      applicationType: "personal";
      formData: PersonalFormValues;
      courseData: CourseValues;
    }
  | {
      applicationType: "group";
      formData: GroupFormValues;
      courseData: CourseValues;
    };

export type CompleteProps =
  | {
      applicationType: "personal";
      formData: PersonalFormValues;
      courseData: CourseValues;
    }
  | {
      applicationType: "group";
      formData: GroupFormValues;
      courseData: CourseValues;
    };


