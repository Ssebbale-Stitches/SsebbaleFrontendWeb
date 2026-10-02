import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export type ModalType = "confirm-logout" | null;

interface ModalsProps {
  activeModal: ModalType;
  closeModal: () => void;
}

export default function Modals({ activeModal, closeModal }: ModalsProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // 2. Close the modal
    closeModal();

    // 3. Redirect to login
    navigate("/login");
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