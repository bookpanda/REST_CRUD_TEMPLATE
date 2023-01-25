import { FC, PropsWithChildren, useState } from "react";

import { destroyCookie, setCookie } from "nookies";

import {
  SignInType,
  SignUpType,
  UserType,
  getUser,
  logOut,
  signIn,
  signUp,
} from "$core/api";

import { AppContext, AuthType, TokenType } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType | undefined>(undefined);

  const signup = async ({
    email,
    password,
    passwordConfirm,
    username,
  }: SignUpType) => {
    const data = await signUp({ username, email, password, passwordConfirm });
    const tokens = data as TokenType;
    if (tokens.access_token !== undefined) {
      createCookies(tokens);
      getuser();
    } else {
      console.log(data);
    }
  };

  const signin = async ({ email, password }: SignInType) => {
    const data = await signIn({ email, password });
    const tokens = data as TokenType;
    if (tokens.access_token !== undefined) {
      createCookies(tokens);
      getuser();
    } else {
      console.log(data);
    }
  };

  const logout = async () => {
    await logOut();
    setAuth(() => undefined);
    destroyCookie(null, "access_token");
    destroyCookie(null, "refresh_token");
  };

  const getuser = async () => {
    const data = await getUser();
    const user = data as UserType;
    if (user.id !== undefined) {
      setAuth(user);
    } else {
      console.log(data);
    }
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
    <AppContext.Provider value={{ auth, signin, signup, logout, getuser }}>
      {children}
    </AppContext.Provider>
  );
};
