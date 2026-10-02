import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* PANEL */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-[0_40px_100px_-30px_rgba(106,86,176,0.5)] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-ink/8">
          <div>
            <h2 className="font-display font-semibold text-base text-ink">{title}</h2>
            {subtitle && <p className="text-[11px] text-ink/45 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink/40 hover:text-ink hover:bg-ink/[0.05] transition-colors shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" fill="none">
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-5">{children}</div>

        {/* FOOTER */}
        {footer && (
          <div className="px-6 py-4 border-t border-ink/8 bg-ink/[0.015] flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}