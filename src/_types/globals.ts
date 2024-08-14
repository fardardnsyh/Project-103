type ReactComponents =
  | JSX.Element
  | React.ReactNode
  | JSX.Element[]
  | React.ReactNode[];

type AlignmentOptions = "left" | "center" | "right";

type DisplayOptions = "inline" | "inline-block" | "block";

export type { ReactComponents, AlignmentOptions, DisplayOptions };
