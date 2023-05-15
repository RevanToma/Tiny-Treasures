import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { toastSlice } from "../../../store/toast/toastSelectors";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdError, MdWarning } from "react-icons/md";
interface ToastProps {
  id: string;
  type?: string;
  message: string;
  onClose: () => void;
}

import { ToastContainer } from "./ToastNotification.style";
const ToastNotification: React.FC<ToastProps> = ({
  id,
  type,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  let Icon;
  let iconColor;
  if (type === "success") {
    Icon = FaCheckCircle;
    iconColor = "green";
  } else if (type === "error") {
    Icon = MdError;
    iconColor = "red";
  } else if (type === "warning") {
    Icon = MdWarning;
    iconColor = "orange";
  }

  return (
    <ToastContainer type={type} visible={true}>
      {Icon && <Icon size={22} color={iconColor} />}
      <div>
        <p>{message}</p>
      </div>
    </ToastContainer>
  );
};

export default ToastNotification;
