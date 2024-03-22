import { useEffect, useState } from "react";

interface FetchApiResult<T> {
  items: T[];
  refetch: () => void;
}

export const useFetchGet = <T>(endpoint: string): FetchApiResult<T> => {
  const [items, setItems] = useState<T[]>([]);
  const url = new URL(endpoint, import.meta.env.APP_API_URL);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          contentType: "application/json",
        },
      });

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
