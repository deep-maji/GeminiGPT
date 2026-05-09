import { useEffect } from "react";
import { useAuth } from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../apis/Auth";
import axios, { type AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }

        return config;
      }
      , (error) => (Promise.reject(error))
    )


    const responeIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        if (axios.isAxiosError(error)) {
          const previousReq = error.config as CustomAxiosRequestConfig;
          if (error.response?.status === 403 && !previousReq._retry) {
            previousReq._retry = true;

            try {
              const newAcessToken = await refresh();
              // If previousReq headers is undefine
              if (previousReq.headers) {
                previousReq.headers['Authorization'] = `Bearer ${newAcessToken}`;
                return axiosPrivate(previousReq);
              }
              return Promise.reject(new Error("Headers is undefine"));
            } catch (e) {
              return Promise.reject(e);
            }
          }

          return Promise.reject(error);
        }
      }
    )


    return () => {
      axiosPrivate.interceptors.response.eject(responeIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    }

  }, [auth, refresh])

  return axiosPrivate;
}

export default useAxiosPrivate;