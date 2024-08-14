interface ExperienceData {
  id: string;
  positionName: string;
  companyName: string;
  startTime: string;
  endTime: string;
  jobType: "part-time" | "full-time";
  description: string;
  uid: string;
}

export type { ExperienceData };
