import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  header: JSX.Element;
  children: ReactNode;
}

export const Modal = ({ onClose, header, children }: ModalProps) => {
  return (
    <>
      <div className="overlay px-7" onClick={() => onClose()}>
        <div
          className="bg-container  rounded-md w-[700px] p-7 py-8 flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          {header}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};
