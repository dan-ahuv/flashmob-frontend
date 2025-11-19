import React, { useEffect } from "react";

interface ErrorPopupProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};
