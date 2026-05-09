import type { AxiosResponse } from "axios";

export function getAllThreadHistroy(axiosPrivate: any) {
  const controller = new AbortController();

  const getThreadshistroyRequest = async () => {
    try {
      const respone: AxiosResponse = await axiosPrivate.get("/api/v1/chat",
        {
          signal: controller.signal,
          withCredentials: true
        });

      if (respone.status === 200) {
        return respone;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  return { controller, getThreadshistroyRequest };
}


export function getChatById(axiosPrivate: any, threadId: string) {
  const controller = new AbortController();

  const getChatByIdReq = async () => {
    try {
      const respone: AxiosResponse = await axiosPrivate.get(`/api/v1/chat/${threadId}`,
        {
          signal: controller.signal,
          withCredentials: true
        });

      if (respone.status === 200) {
        return respone;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  return { controller, getChatByIdReq };
}


export function creatNewMessage(axiosPrivate: any, threadId: string, prompt: string) {
  const threadController = new AbortController();

  const creatNewMessageReq = async () => {
    try {
      const respone: AxiosResponse = await axiosPrivate.post(`/api/v1/chat`,
        {
          prompt,
          threadId
        },
        {
          signal: threadController.signal,
          withCredentials: true
        });

      if (respone.status === 200) {
        return respone;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  return { threadController, creatNewMessageReq };
}


export function deleteThread(axiosPrivate: any, mongoThreadId: string) {
  const threadDeleteController = new AbortController();

  const deleteThreadReq = async () => {
    try {
      const respone: AxiosResponse = await axiosPrivate.delete(`/api/v1/chat/${mongoThreadId}`,
        {
          signal: threadDeleteController.signal,
          withCredentials: true
        });

      if (respone.status === 200) {
        return respone;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  return { threadDeleteController, deleteThreadReq };
}