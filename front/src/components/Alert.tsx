import { useState } from "react";

interface IAlertProps {
   color: string;
   message: string | undefined;
   setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
   showAlert: boolean;
}


export const Alert: React.FC<IAlertProps> = ({ color, message, showAlert, setShowAlert }) => {
    return (
      <>
        {showAlert && (
          <div
            className={
              `text-white hover:animate-pulse px-4 py-3 border-0 rounded fixed z-100 top-20 right-0 mb-4 bg-${color}`
            }
          >
            <span className="inline-block align-middle mr-8">
                {message}
            </span>
            <button
              className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-4 outline-none focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              <span>×</span>
            </button>
          </div>
        )}
      </>
    );
  };