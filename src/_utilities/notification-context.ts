import { ToastOptions, toast } from "react-toastify";
import { NotificationProps } from "../_types/notification";
import { createContext } from "react";

/**
 * Display a notification
 *
 * @param {NotificationProps} - props
 * @returns {void}
 *
 * ```ts
 * displayNotification({
 *  title: 'Successfully added a hoodie to your order!',
 *  type: 'success',
 *  onPress: () => handleNotificationTap(),
 *  dismissAfter: 3500,
 * })
 * ```
 */
const displayNotification = ({
  title,
  type,
  onPress,
  autoHide,
  dismissAfter,
}: NotificationProps): void => {
  const notificationOptions: ToastOptions = {
    autoClose: autoHide === false ? false : dismissAfter || 1500,
    closeButton: false,
    onClick: onPress ? () => onPress() : () => null,
    closeOnClick: true,
    pauseOnHover: true,
    type,
    position: "top-center",
  };

  toast(title, notificationOptions);
};

/**
 * Hide all currently-visible notifications
 *
 * @returns {void}
 *
 * ```ts
 * hideNotification()
 * ```
 */
const hideNotification = (): void => {
  toast.dismiss();
};

const NotificationContext = createContext({
  displayNotification,
  hideNotification,
});

export { NotificationContext, displayNotification, hideNotification };
