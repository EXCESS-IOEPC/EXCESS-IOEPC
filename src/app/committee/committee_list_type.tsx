export interface CommitteeListType {
  year: string;
  committeeNumber: string;
  currentCommittee?: boolean;
  committeeMembers: {
    photo?: string;
    name: string;
    position: string;
  }[];
}
