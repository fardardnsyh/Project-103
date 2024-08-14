interface DropdownData {
  id: string;
  displayValue: string;
}

interface DropdownInputProps {
  onChange: (newValue: string) => void;
  initialValue?: string | number;
  unselectedDisplayValue?: string;
  data: DropdownData[];
  isDisabled?: boolean;
  error?: string;
  isRequired?: boolean;
  title: string;
}

export type { DropdownInputProps, DropdownData };
