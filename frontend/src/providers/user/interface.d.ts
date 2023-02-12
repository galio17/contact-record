import { ReactNode } from "react";

export interface UserProviderProps {
  children: ReactNode;
}

export interface ErrorAPI {
  message: string | string[];
  typeError: string;
}

export interface LoginRequestAPI {
  email: string;
  password: string;
}
export interface LoginReturnAPI {
  token: string;
}
export type LoginAPI = (loginData: LoginRequestAPI) => Promise<LoginReturnAPI>;

export interface UserContextValues {
  login: LoginAPI;
}
