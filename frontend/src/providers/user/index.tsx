import { AxiosError } from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services";
import {
  ErrorAPI,
  LoginAPI,
  LoginReturnAPI,
  UserContextValues,
  UserProviderProps,
} from "./interface";

export const UserContext = createContext<UserContextValues>(
  {} as UserContextValues
);

const UserProvider = ({ children }: UserProviderProps) => {
  const login: LoginAPI = async (loginData) => {
    try {
      const { data } = await api.post<LoginReturnAPI>("/login", loginData);

      localStorage.removeItem("@contact-record:token");
      localStorage.setItem("@contact-record:token", data.token);
      api.defaults.headers["Authorization"] = data.token;

      return data;
    } catch (error) {
      console.error(error);

      if (!(error instanceof AxiosError) || !error.response) {
        throw error;
      }

      const apiError = error as AxiosError<ErrorAPI>;
      throw apiError.response!.data.message;
    }
  };

  return (
    <UserContext.Provider value={{ login }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
