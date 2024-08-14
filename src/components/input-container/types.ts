type TextTypeOptions = "text" | "number" | "date" | "month";

interface InputContainerProps {
  title: string;
  error?: string;
  type?: TextTypeOptions;
  isDisabled?: boolean;
  value?: string;
  initialValue?: string;
  placeHolder?: string;
  numberOfLines?: number;
  onTextChange?: (value: string) => void;
  isRequired?: boolean;
}

export type { InputContainerProps };
