import React, { useEffect, useState } from "react";

type ToasterProps = {
  message: string | null;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToasterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <div
      className={`fixed bottom-0 right-0 bg-gray-800 text-white p-4 rounded-t-md ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      {message}
    </div>
  );
}
