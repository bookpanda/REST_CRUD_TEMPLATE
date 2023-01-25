import { FC, PropsWithChildren, useState } from "react";

import { parseCookies, setCookie } from "nookies";

import { SignInType, SignUpType, logOut, signIn, signUp } from "$core/api";

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
    const tokens = data as TokenType;
    if (tokens.access_token !== undefined) {
      setToken(data as TokenType);
      createCookies(tokens);
      console.log(token);
    } else {
      console.log(data);
    }
  };
  const signin = async ({ email, password }: SignInType) => {
    const data = await signIn({ email, password });
    const tokens = data as TokenType;
    if (tokens.access_token !== undefined) {
      setToken(data as TokenType);
      createCookies(tokens);
      const cookies = parseCookies();
      console.log(cookies);
    } else {
      console.log(data);
    }
  };
  const logout = async () => {
    await logOut();
  };
  const createCookies = (tokens: TokenType) => {
    setCookie(null, "access_token", tokens.access_token, {
      maxAge: 30 * 24 * 60 * 60,
    });
    setCookie(null, "refresh_token", tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60,
    });
  };
  return (
    <AppContext.Provider
      value={{ auth, token, setAuth, signin, signup, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
