import { toast } from "react-toastify";

export const getFormatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleString();

export const generateToast = (text: string) => {
  toast(`🦄 ${text}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
