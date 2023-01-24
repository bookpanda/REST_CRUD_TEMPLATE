import { FC, PropsWithChildren, useState } from "react";

import { DataType, SignInType, signIn } from "$core/api/signin";

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
  const signin = async ({ email, password }: SignInType) => {
    const data = await signIn({ email, password });
    console.log(data);
    try {
      setToken(data as TokenType);
    } catch (error) {
      console.log(data);
    }
  };
  return (
    <AppContext.Provider value={{ auth, token, setAuth, signin }}>
      {children}
    </AppContext.Provider>
  );
};
