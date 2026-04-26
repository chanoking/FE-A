import type { Participant } from "./participant";

export interface Info {
  name: string;
  email: string;
  phone: string;
  reason: string;
  groupName: string;
  representativePhoneNumber: string;
  participants: Participant[];
}
