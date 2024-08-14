interface EducationData {
  id: string;
  title: string;
  institutName: string;
  location: string;
  startTime: string;
  endTime: string;
}
interface ImageFile {
  url: string;
  name: string;
}

interface UserData {
  uid: string;
  email: string;
  name: string;
  linkedInLink: string;
  githubLink: string;
  portfolioLink: string;
  profilePhoto: ImageFile | null;
  education: EducationData[];
  professionalPhotos: ImageFile[];
}

interface FormState {
  email: string;
  password: string;
  name: string;
}

export type { UserData, FormState, EducationData, ImageFile };
