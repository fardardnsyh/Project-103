import { ReactComponents } from "../../_types/globals";

interface ButtonProps {
  text: ReactComponents;
  isDisabled?: boolean;
  callback?: () => void;
  theme?: "normal" | "dark";
}

export type { ButtonProps };
