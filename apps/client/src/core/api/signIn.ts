import { TokenType } from "$core/contexts/appContext";

export type SignInType = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignInType) {
  const url = "http://localhost:4201/auth/signin";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  console.log(`fetching`);
  return await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);

  function handleResponse(response: Response) {
    return response.json().then(function (json) {
      return response.ok ? Promise.resolve(json) : Promise.reject(json);
    });
  }
  function handleData(data: TokenType) {
    return data;
  }

  async function handleError(error: Error) {
    return { msg: error.message };
  }
}
