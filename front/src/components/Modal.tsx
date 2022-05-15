import React from "react";

interface IModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onApply: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    buttons: string;
}

export const Modal: React.FC<IModalProps> = ({showModal, setShowModal, title, onApply, buttons, children}) => {

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none mx-10">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-primary outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-3xl font-semibold dark:text-white">
                    {title}
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                    {children}
                </div>
                <div className="flex items-center justify-center space-x-6 p-6">
                  <button
                    className="bg-primary dark:bg-white dark:text-primary text-white hover:text-red font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    {buttons.split("/")[0]}
                  </button>
                  <button
                    className="bg-blue text-white hover:dark:bg-white hover:bg-primary hover:text-green font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onApply}
                  >
                    {buttons.split("/")[1]}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-primary dark:bg-brown"></div>
        </>
      )}
    </>
  );
}