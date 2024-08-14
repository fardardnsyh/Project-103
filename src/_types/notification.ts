type NotificationType = "success" | "warning" | "error" | "info";

interface NotificationProps {
  type: NotificationType;
  autoHide?: boolean;
  dismissAfter?: number;
  title: string;
  onPress?: () => void;
}

export type { NotificationProps, NotificationType };
