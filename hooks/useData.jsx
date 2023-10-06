import useSWR from "swr";
import { useEffect, useState } from "react";
import httpService from "../services/httpService";
import { apiErrorMessage } from "./../utils/handleAPIErrors";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const fetcher = (url) => fetch(url).then((res) => res.json());

function useData() {
  // console.log(fallbackData?.data);
  const initialState = { data: { blog: [] } };
  const router = useRouter();

  // const fetcher = async (url) => {
  //   try {
  //     let data = await httpService.get(url);
  //     data = await data.data;
  //     return data;
  //   } catch (error) {
  //     const message = apiErrorMessage(error);
  //     toast.error(message);
  //   }
  // };

  const { data, error, mutate } = useSWR("/api/articles", fetcher);

  useEffect(() => {
    // console.log(data);
  });

  return {
    allData: data || initialState,
    isLoading: !error && !data,
    isEmpty: !data?.data,
    isError: error,
    mutate,
  };
}

export { useData };
