import { TokenType } from "$core/contexts/appContext";

export type SignUpType = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export async function signUp({
  email,
  password,
  passwordConfirm,
  username,
}: SignUpType) {
  const url = "http://localhost:4201/auth/signup";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      passwordConfirm,
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
