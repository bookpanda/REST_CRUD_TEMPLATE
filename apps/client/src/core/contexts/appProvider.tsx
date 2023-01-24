import { FC, PropsWithChildren, useState } from "react";

import { AppContext, AuthType } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType>({
    id: "",
    username: "",
    email: "",
  });
  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};
