import { errorToast } from "../components/Toast";

interface FetchApiResult<T> {
  data: T[];
}

export const fetchApi = async <T>(
  endpoint: string,
  body: any,
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

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    return { data };
  } catch (err) {
    console.error(err);
    errorToast("Erro interno do servidor");
    throw err;
  }
};
