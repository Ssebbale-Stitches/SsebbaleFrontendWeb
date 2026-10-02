import LogoutModal from "./LogoutModal";

export type ModalType = "confirm-logout" | null;

interface ModalsProps {
  activeModal: ModalType;
  closeModal: () => void;
}

export default function Modals({ activeModal, closeModal }: ModalsProps) {
  const handleLogout = () => {
    // TODO: wire up real logout logic (clear auth, redirect, etc.)
    console.log("Logging out...");
    closeModal();
  };

  return (
    <>
      <LogoutModal
        isOpen={activeModal === "confirm-logout"}
        onClose={closeModal}
        onConfirm={handleLogout}
      />
    </>
  );
}