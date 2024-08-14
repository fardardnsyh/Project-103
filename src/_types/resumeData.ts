import { FileData } from "./fileData";

interface ResumeData {
  id: string;
  name: string;
  resumeFile: FileData | null;
  uid: string;
}

export type { ResumeData };
