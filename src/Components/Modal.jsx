import React, { useEffect, useRef } from "react";


function Modal({
  open = false,
  onClose,
  title = "Modal Title",
  children = null,
  size = "md",
  closeOnOverlayClick = true,
  onOk, // optional callback for Ok button
  okText = "Ok",
  cancelText = "Cancel",
  footer=false
}) {
  const dialogRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Size map
  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px]"
        onClick={() => closeOnOverlayClick && onClose?.()}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="fixed inset-0 z-[61] grid place-items-center p-4"
        aria-live="polite"
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`w-full ${sizeClass}`}
          onClick={(e) => e.stopPropagation()}
          ref={dialogRef}
        >
          <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-zinc-900">
            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {title}
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" fill="none" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-5 py-4 text-zinc-700 dark:text-zinc-200">
              {children || (
                <p className="text-center text-base">
                  Are you sure you want to proceed?
                </p>
              )}
            </div>

            {/* Footer */}
         {footer&&   <div className="flex justify-end gap-2 border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
              <button
                onClick={onClose}
                className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {cancelText}
              </button>
              <button
                onClick={onOk}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {okText}
              </button>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Modal);

