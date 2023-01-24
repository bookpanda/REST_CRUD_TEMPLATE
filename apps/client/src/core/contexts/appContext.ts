import { createContext, useContext } from "react";

export type AuthType = {
  id: string;
  username: string;
  email: string;
};

interface IAppContext {
  auth: {
    id: string;
    username: string;
    email: string;
  };
  setAuth: (input: AuthType) => void;
}

export const initState = {
  auth: {
    id: "",
    username: "",
    email: "",
  },
  setAuth: () => null,
};

export const AppContext = createContext<IAppContext>(initState);

export function useAppContext() {
  return useContext(AppContext);
}
