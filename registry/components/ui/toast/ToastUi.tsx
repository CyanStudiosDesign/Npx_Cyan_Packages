interface ToastProps {
  toastMessage: string;
}
const ToastUi = ({ toastMessage }: ToastProps) => {
  return (
    <div
      className="
        fixed top-20 right-5 z-50
        mt-[var(--spacing-8)]
        flex items-center justify-center
        p-[var(--spacing-4)]
        rounded-[var(--radius-lg)]
        shadow-[var(--shadow-md)]
        bg-[var(--color-inverse)]
        border border-[var(--color-border)]
        cursor-default
      "
    >
      <div className="text-white text-[var(--text-sm)] font-[var(--font-medium)]">
        {toastMessage}
      </div>
    </div>
  );
};

export default ToastUi;
