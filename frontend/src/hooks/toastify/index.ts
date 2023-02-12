import { Id, toast } from "react-toastify";

export const useToastLoading = () => {
  const loading = (message: string = "Carregando") => toast.loading(message);

  const success = (toastId: Id, message: string = "Sucesso") => {
    toast.update(toastId, {
      isLoading: false,
      autoClose: 3000,
      type: "success",
      render: message,
    });
  };

  const error = (toastId: Id, message: string = "Erro") => {
    toast.update(toastId, {
      delay: 500,
      isLoading: false,
      closeOnClick: true,
      draggable: true,
      autoClose: 3000,
      type: "error",
      render: message,
    });
  };

  return { loading, success, error };
};
