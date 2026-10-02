import LogoutModal from "./LogoutModal";

export type ModalType = "confirm-logout" | null;

interface ModalsProps {
  activeModal: ModalType;
  closeModal: () => void;
}

export default function Modals({ activeModal, closeModal }: ModalsProps) {
  const handleLogout = () => {
    console.log("Logout confirmed!");
    // TODO: real logout logic later (clear auth, redirect, etc.)
    closeModal();
  };

  console.log("Modals rendered, activeModal =", activeModal);

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