import { createContext, useContext } from "react";

import { SignInType } from "$core/api";

export type AuthType = {
  id: string;
  username: string;
  email: string;
};

export type TokenType = {
  access_token: "";
  refresh_token: "";
};

interface IAppContext {
  auth: { id: string; username: string; email: string };
  token: { access_token: string; refresh_token: string };
  setAuth: (input: AuthType) => void;
  signin: (input: SignInType) => void;
}

export const initState = {
  auth: {
    id: "",
    username: "",
    email: "",
  },
  token: {
    access_token: "",
    refresh_token: "",
  },
  setAuth: () => null,
  signin: () => null,
};

export const AppContext = createContext<IAppContext>(initState);

export function useAppContext() {
  return useContext(AppContext);
}