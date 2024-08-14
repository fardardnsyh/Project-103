import { FileData } from "./fileData";

interface CoverLetterData {
  id: string;
  name: string;
  coverLetterFile: FileData | null;
  uid: string;
}

export type { CoverLetterData };
