import { ReactComponents } from "../../_types/globals";

interface PageContainerProps {
  children: ReactComponents;
  title?: string;
  customActions?: ReactComponents;
  onPageReady?: () => void;
}

export type { PageContainerProps };
