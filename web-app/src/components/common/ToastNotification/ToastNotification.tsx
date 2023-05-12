import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { toastSlice } from "../../../store/toast/toastSelectors";
import { useEffect, useState } from "react";
import { hideToast } from "../../../store/toast/toastSlice";
import { FaCheckCircle } from "react-icons/fa";
import { MdError, MdWarning } from "react-icons/md";

import { ToastContainer } from "./ToastNotification.style";
const ToastNotification = () => {
  const dispatch = useAppDispatch();
  const { message, type, visible } = useSelector(toastSlice);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visible) {
      setAnimate(true);
      timer = setTimeout(() => {
        setAnimate(false);
        timer = setTimeout(() => {
          dispatch(hideToast());
        }, 500);
      }, 2500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, visible]);

  if (!visible) {
    return null;
  }

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
    <ToastContainer type={type} visible={animate}>
      {Icon && <Icon size={22} color={iconColor} />}
      <div>
        <p>{message}</p>
      </div>
    </ToastContainer>
  );
};

export default ToastNotification;
