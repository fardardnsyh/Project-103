interface ApplicationData {
  id: string;
  positionName: string;
  companyName: string;
  status: "applied" | "not-selected" | "in-process" | "follow-up";
  jobDescription: string;
  applyDate: string;
  source: string;
  resume: string;
  location: string;
  coverLetter: string;
  companyEmail: string;
  uid: string;
}

export type { ApplicationData };
