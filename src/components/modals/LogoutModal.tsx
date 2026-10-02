import Modal from "./Modal";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log out?"
      subtitle="You'll need to sign back in to access your dashboard."
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-ink/60 hover:text-ink hover:bg-ink/[0.05] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Log out
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" stroke="currentColor" fill="none">
            <path
              d="M15 16l4-4m0 0l-4-4m4 4H9M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-sm text-ink/60 pt-1.5">
          Any unsaved changes will be lost. Are you sure you want to continue?
        </p>
      </div>
    </Modal>
  );
}