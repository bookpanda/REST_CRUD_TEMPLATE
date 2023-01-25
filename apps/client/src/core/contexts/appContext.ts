import { createContext, useContext } from "react";

import { SignInType, SignUpType } from "$core/api";

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
  auth: { id: string; username: string; email: string } | undefined;
  signin: (input: SignInType) => void;
  signup: (input: SignUpType) => void;
  logout: () => void;
  getuser: () => void;
}

export const initState = {
  auth: undefined,
  signin: () => null,
  signup: () => null,
  logout: () => null,
  getuser: () => null,
};

export const AppContext = createContext<IAppContext>(initState);

export function useAppContext() {
  return useContext(AppContext);
}
