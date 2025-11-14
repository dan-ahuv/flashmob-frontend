import React, { type ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto p-4"
      onClick={onClose} // close on clicking overlay
    >
      <div
        className="bg-[var(--background)] rounded-xl shadow-xl w-full max-w-[80vw] h-[80vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
        {children}
        <button
          className="absolute top-4 right-4 text-[var(--faded-text)] hover:text-[var(--text)] text-2xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
