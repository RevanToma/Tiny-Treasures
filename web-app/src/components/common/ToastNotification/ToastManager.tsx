import { useSelector } from "react-redux";
import { selectToasts } from "../../../store/toast/toastSelectors";
import { useAppDispatch } from "../../../hooks/useDispatch";
import ToastNotification from "./ToastNotification";
import { removeToast } from "../../../store/toast/toastSlice";

const ToastManager = () => {
  const dispatch = useAppDispatch();
  const toasts = useSelector(selectToasts);

  return (
    <div>
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
};

export default ToastManager;
