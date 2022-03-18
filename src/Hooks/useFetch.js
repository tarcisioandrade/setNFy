import { useState, useCallback } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let data;
    try {
      setLoading(true);
      response = await fetch(url, options);
      data = response.json();
      if (!response.ok) throw new Error(data.message);
      setData(data);
    } catch (error) {
      data = null;
      setError(error.message);
    } finally {
      setLoading(false);
      return { response };
    }
  }, []);

  return { loading, data, error, request };
};

export default useFetch;
