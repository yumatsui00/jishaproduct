interface TopNotificationProps {
  open: boolean;
  message: string;
}

/**
 * Renders a top floating notification for list feedback.
 *
 * @param props Visibility state and message.
 * @returns The top notification component.
 */
export default function TopNotification({
  open,
  message,
}: TopNotificationProps) {
  return (
    <div
      aria-live="polite"
      className={`fixed inset-x-0 top-20 z-50 flex justify-center px-4 transition-all duration-300 sm:px-6 ${
        open
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-lg rounded-[1.25rem] border border-rose-300 bg-rose-50/96 px-5 py-4 text-center shadow-[0_18px_50px_rgba(225,29,72,0.18)] backdrop-blur-md">
        <p className="text-sm font-semibold text-rose-700">{message}</p>
      </div>
    </div>
  );
}
