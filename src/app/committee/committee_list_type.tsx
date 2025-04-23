export interface CommitteeListType {
	year: string;
	committeeNumber: string;
	committeeMembers: {
		photo?: string;
		name: string;
		position: string;
	}[];
}
