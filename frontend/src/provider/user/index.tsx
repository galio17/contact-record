import { createContext } from "react";
import { UserContextValues, UserProviderProps } from "./interface";

export const UserContext = createContext<UserContextValues>({});

const UserProvider = ({ children }: UserProviderProps) => {
  const { Provider } = UserContext;

  return <Provider value={{}}>{children}</Provider>;
};

export default UserProvider;
