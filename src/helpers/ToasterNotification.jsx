// ToastNotification.js
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const ToasterNotification = ({ showToast, message="test notification", type, setShowToast}) => {
  useEffect(() => {
    if (showToast) {
      switch (type) {
        case 'success':
          toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick:setShowToast(false),
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          break;
        case 'error':
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: setShowToast(false),
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          break;
        // Add more cases for other types of toasts if needed
        default:
          toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: setShowToast(false),
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          break;
      }
    }
  }, [showToast, message, type]);

  return <ToastContainer style={{fontSize:'15px'}}/>;
};

export default ToasterNotification;
