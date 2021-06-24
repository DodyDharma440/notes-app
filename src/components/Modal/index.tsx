import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  doneButtonAction: () => void;
  doneButtonText?: string;
  renderModalContent: () => JSX.Element;
};

const Modal: React.FC<Props> = ({
  renderModalContent,
  open,
  onClose,
  title,
  doneButtonAction,
  doneButtonText,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    if (!open) {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return open ? (
    <>
      <div
        className="fixed bg-black opacity-50 inset-0 z-30"
        onClick={onClose}
      />
      <div className="bg-white w-80 top-1/2 rounded-lg fixed left-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <div className="px-4 py-2">
          <h5 className="font-bold text-xl">{title}</h5>
        </div>
        <hr />
        <div className="px-4 py-2">{renderModalContent()}</div>
        <hr />
        <div className="px-4 py-2 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-600 rounded-md text-gray-100 mr-2 focus:outline-none hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={doneButtonAction}
            className="px-4 py-2 bg-blue-400 rounded-md focus:outline-none hover:bg-blue-500 text-gray-100"
          >
            {doneButtonText ? doneButtonText : "Ok"}
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
