"use client";
import { useEffect, useState } from "react";

const useFetch = (url: string | URL | Request) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, {cache: 'no-store'})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return {data};
};

export default useFetch;
