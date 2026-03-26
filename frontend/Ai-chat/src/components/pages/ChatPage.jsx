import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import ReactMarkdown from "react-markdown";

import WithAuth from "../../utils/WithAuth";
import SideBarComponent from "../component/SideBarComponent";
import ChatWindowComponent from "../component/ChatWindowComponent";

import { v4 as uuidv4 } from "uuid";

import { ChatContext } from "../../context/ChatContext";

function ChatPage() {
  const [chat_id, setChat_id] = useState("");
  const [chats, setChats] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [chatsHistroy, setChatHistroy] = useState([]);
  const { getAllChats, getChatByID, chatWithAi } = useContext(ChatContext);

  console.log(chat_id);

  const handleChatHistroy = async () => {
    try {
      let res = await getAllChats();
      setChatHistroy(res.data.chatHistroy);
      console.log(res.data);
    } catch (error) {
      console.log("Get Chat histroy : ", error);
    }
  };

  useEffect(() => {
    handleChatHistroy();
  }, []);

  const handleChatbyID = async (chatID) => {
    try {
      let res = await getChatByID(chatID);
      console.log(res.data);
      
      setChat_id(res.data.response.chat_id);
      setChatHistroy((prev) =>
        prev.map((ele) => ({
          ...ele,
          selected: res.data.response._id === ele._id,
        })),
      );
      setChats(res.data.response.messages);
      console.log(res.data.response.messages);
    } catch (error) {
      console.dir(error);
    }
  };

  const sideBarProps = {
    chatsHistroy,
    setChatHistroy,
    handleChatHistroy,
    handleChatbyID,
  };

  const handleChat = async () => {
    try {
      let userPrompt;
      if (!chat_id) {
        const chatUUid = uuidv4();
        setChat_id(chatUUid);
        userPrompt = {
          prompt,
          chat_id: chatUUid,
        };
      } else {
        userPrompt = {
          prompt,
          chat_id: chat_id,
        };
      }
      let res = await chatWithAi(userPrompt);
      setChats(res.data.response.messages);
      const histroyForChat = {
        title: res.data.response.title,
        _id: res.data.response._id,
      };
      displayLatestChatHistroy(histroyForChat);
      setChatHistroy((prev) =>
        prev.map((ele) => ({
          ...ele,
          selected: res.data.response._id === ele._id,
        })),
      );
      // console.log(res.data.response.messages);
      console.log(res.data.response);
    } catch (error) {
      console.dir("Chat error : ", error);
    }
  };

  const displayUserPrompt = () => {
    const userPrompt = {
      content: prompt,
      role: "user",
    };
    setChats((prev) => {
      return [...prev, userPrompt];
    });
    setPrompt("");
  };

  const displayLatestChatHistroy = (currHistroy) => {
    const chatIdx = chatsHistroy.findIndex((ele) => ele._id == currHistroy._id);
    console.log(chatIdx);

    if (chatIdx === -1) {
      setChatHistroy((prev) => {
        let newChatHistroy = [...prev];
        newChatHistroy.unshift(currHistroy);
        return newChatHistroy;
      });
    } else {
      const chatPresent = chatsHistroy.splice(chatIdx, 1)[0];
      setChatHistroy((prev) => {
        let newChatHistroy = [...prev];
        newChatHistroy.unshift(chatPresent);
        return newChatHistroy;
      });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    displayUserPrompt();
    handleChat();
  };

  const chatWindowProps = {
    chats,
    setChats,
    prompt,
    setPrompt,
    handleChat,
    handleForm,
  };

  return (
    <div className={styles.mainconatiner}>
      <div className={styles.sidebar}>
        <SideBarComponent sideBarProps={sideBarProps}></SideBarComponent>
      </div>
      <div className={styles.mainchat}>
        <ChatWindowComponent
          chatWindowProps={chatWindowProps}
        ></ChatWindowComponent>
      </div>
    </div>
  );
}

export default WithAuth(ChatPage);
