import { parseCookies } from "nookies";

export type UserType = {
  id: "";
  username: "";
  email: "";
};

export async function getUser() {
  const cookies = parseCookies();
  const url = "http://localhost:4201/user";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies["access_token"]}`,
      Accept: "application/json",
    },
  };
  return await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);

  function handleResponse(response: Response) {
    return response.json().then(function (json) {
      return response.ok ? Promise.resolve(json) : Promise.reject(json);
    });
  }
  function handleData(data: UserType) {
    return data;
  }

  async function handleError(error: Error) {
    return { msg: error.message };
  }
}
