import { createContext } from "react";
import axios from "axios";

export const ChatContext = createContext();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_LOCALHOST_URL,
  // baseURL : import.meta.env.VITE_API_PRODUCTION_URL
});

export const ChatProvider = ({ children }) => {
  const getAllChats = async () => {
    try {
      let res = await api.get("/api/v1/chat", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  };

  const chatWithAi = async ({ prompt, chat_id, history }) => {
    try {
      let res = await api.post(
        "/api/v1/chat",
        { prompt, chat_id, history },
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      return res;
    } catch (error) {
      throw error;
    }
  };

  const getChatByID = async (chatID) => {
    console.log(chatID);

    try {
      let res = await api.get(`/api/v1/chat/${chatID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  };

  const data = {
    getAllChats,
    chatWithAi,
    getChatByID,
  };

  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};
