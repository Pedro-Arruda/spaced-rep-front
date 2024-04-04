import { errorToast } from "../components/Toast";
import { IAuth } from "../contexts/auth";

interface FetchApiResult<T> {
  data: T;
}

export const fetchApi = async <T>(
  endpoint: string,
  body: any,
  auth: IAuth,
  updateAuth: (auth: IAuth | null) => void,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
  contentType?: "application/json"
): Promise<FetchApiResult<T>> => {
  const headers: Record<string, string> = {};

  if (contentType) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const url = new URL(endpoint, import.meta.env.APP_API_URL);

  const options: RequestInit = {
    headers,
    method,
    body,
  };

  let refreshToken = auth ? auth.refreshToken : null;

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    errorToast(error.message);
  }

  if (response.status == 401) {
    const tokenURL = new URL(`${url}/token`);

    const refreshResponse = await fetch(tokenURL.toString(), {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (refreshResponse.status == 401) {
      updateAuth(null);
    }

    const refreshTokenData = await refreshResponse.json();

    updateAuth({
      refreshToken: auth!.refreshToken,
      user: auth!.user,
      accessToken: refreshTokenData.accessToken,
    });

    return fetchApi(endpoint, body, auth, updateAuth, method, contentType);
  }

  const data = await response.json();

  return { data };
};
