/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
export const Modal = ({
  isOpen,
  setIsOpen,
  children,
  onEnterKey,
  maxWidth = "max-w-xl",
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onEnterKey) {
      onEnterKey();
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ duration: 0.3 }}
            className={`bg-[#fefefefe] text-gray-900 rounded w-full h-fit  shadow-xl cursor-default relative ${maxWidth}`}
          >
            <div className="relative z-10 h-[80%]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

