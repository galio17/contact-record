import { AxiosError } from "axios";
import { createContext } from "react";
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
  const { Provider } = UserContext;

  const login: LoginAPI = async (loginData) => {
    try {
      const { data } = await api.post<LoginReturnAPI>("/login", loginData);

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

  return <Provider value={{ login }}>{children}</Provider>;
};

export default UserProvider;
