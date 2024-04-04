import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";

interface FetchApiResult<T> {
  items: T[];
  refetch: () => void;
}

export const useFetchGet = <T>(endpoint: string): FetchApiResult<T> => {
  const { auth, updateAuth } = useAuth();
  const [items, setItems] = useState<T[]>([]);

  const url = new URL(endpoint, import.meta.env.APP_API_URL);

  const fetchData = async () => {
    try {
      let refreshToken = auth ? auth.refreshToken : null;

      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          contentType: "application/json",
          authorization: `Bearer ${auth?.accessToken}`,
        },
      });

      if (response.status == 401) {
        const tokenURL = new URL("token", `${import.meta.env.APP_API_URL}`);

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

        return useFetchGet(endpoint);
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { items, refetch };
};
