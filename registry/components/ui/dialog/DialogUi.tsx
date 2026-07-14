"use client";
import React, { useState } from "react";
import ModalUi from "./ModalUi";

const DialogUi = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center">
      <button
        className="
          rounded-md
          px-4
          py-2
          text-sm
          font-medium
          text-fg-inverse
          bg-primary
          hover:bg-primary-hover
          transition-all
          focus-ring-visible
        "
        onClick={handleModal}
      >
        Open Dialog
      </button>

      {isOpen && <ModalUi handleClose={onClose} />}
    </div>
  );
};

export default DialogUi;
