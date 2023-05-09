import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally{
        setLoading(false);
      }
    };

    getData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
