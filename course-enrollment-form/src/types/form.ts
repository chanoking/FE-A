import type { Dispatch, SetStateAction } from "react";
import type { Participant } from "./participant";

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

export type PersonalProps = {
  formData: PersonalFormValues;
  setFormData: Dispatch<SetStateAction<PersonalFormValues>>;
};

export type GroupProps = {
  formData: GroupFormValues;
  setFormData: Dispatch<SetStateAction<GroupFormValues>>;
};
