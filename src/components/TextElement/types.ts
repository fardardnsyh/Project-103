import {
  AlignmentOptions,
  DisplayOptions,
  ReactComponents,
} from "../../_types/globals";

type TextThemeOptions =
  | "h1"
  | "h2"
  | "h3"
  | "paragraph"
  | "paragraph-bold"
  | "link";

interface TextElementProps {
  theme: TextThemeOptions;
  display?: DisplayOptions;
  alignment?: AlignmentOptions;
  text: ReactComponents;
  colour?: string;
  onClick?: () => void;
  width?: string;
  padding?: string;
}

export type { TextElementProps, TextThemeOptions };
