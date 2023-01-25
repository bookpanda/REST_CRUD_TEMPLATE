import { FC, PropsWithChildren, useState } from "react";

import { SignInType, SignUpType, signIn, signUp } from "$core/api";

import { AppContext, AuthType, TokenType } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType>({
    id: "",
    username: "",
    email: "",
  });
  const [token, setToken] = useState<TokenType>({
    access_token: "",
    refresh_token: "",
  });
  const signup = async ({
    email,
    password,
    passwordConfirm,
    username,
  }: SignUpType) => {
    const data = await signUp({ username, email, password, passwordConfirm });
    if ((data as TokenType).access_token !== undefined) {
      setToken(data as TokenType);
      console.log(token);
    } else {
      console.log(data);
    }
  };
  const signin = async ({ email, password }: SignInType) => {
    const data = await signIn({ email, password });
    if ((data as TokenType).access_token !== undefined) {
      setToken(data as TokenType);
      console.log(token);
    } else {
      console.log(data);
    }
  };
  return (
    <AppContext.Provider value={{ auth, token, setAuth, signin, signup }}>
      {children}
    </AppContext.Provider>
  );
};
