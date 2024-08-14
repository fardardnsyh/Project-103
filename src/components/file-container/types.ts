import { FileData } from "../../_types/fileData";

interface FileContainerProps {
  title: string;
  error?: string;
  isDisabled?: boolean;
  initialValue?: FileData | null;
  value?: FileData | null;
  onChange?: (value: File) => void;
  isRequired?: boolean;
}

export type { FileContainerProps };
