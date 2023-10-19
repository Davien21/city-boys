import { ReactElement, ReactNode } from "react";
import {
  Id,
  ToastOptions,
  toast as toastService,
  TypeOptions,
} from "react-toastify";

const baseConfig = {
  autoClose: 5000,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
};

const toast = {
  ...toastService,
  success: (message: string | ReactNode, options: ToastOptions = {}) =>
    toastService.success(message, { ...baseConfig, ...options }),
  error: (message: string | ReactNode, options: ToastOptions = {}) =>
    toastService.error(message, { ...baseConfig, ...options }),
  info: (message: string | ReactNode, options: ToastOptions = {}) =>
    toastService.info(message, { ...baseConfig, ...options }),
  warning: (message: string | ReactNode, options: ToastOptions = {}) =>
    toastService.warning(message, { ...baseConfig, ...options }),
  update: (
    toastId: string | Id,
    render: string | ReactElement,
    options: {
      isLoading?: boolean;
      type?: TypeOptions;
      onClose?: () => void;
    } = {}
  ) => {
    if (!options?.isLoading) options.isLoading = false;
    if (!options?.type) options.type = "success";
    return toastService.update(toastId, { ...baseConfig, render, ...options });
  },
  dismiss: (toastId: string | Id) => toastService.dismiss(toastId),
  loading: (message: string) => toastService.loading(message, baseConfig),
};

export default toast;
