import { parseCookies } from "nookies";

import { TokenType } from "$core/contexts/appContext";

export async function logOut() {
  const cookies = parseCookies();
  const url = "http://localhost:4201/auth/logout";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies["access_token"]}`,
      Accept: "application/json",
    },
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
