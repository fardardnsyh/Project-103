import { ImageFile } from "../../_types/userData";

interface ImageUploadProps {
  title: string;
  error?: string;
  isDisabled?: boolean;
  initialData?: ImageFile[];
  onFilesChange: (newValue: File[]) => void;
  maxImages?: number;
  isRequired?: boolean;
}

export type { ImageUploadProps };
