import styles from "../../styles/Home.module.css";
import { useEffect } from "react";

import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IosShareIcon from "@mui/icons-material/IosShare";
import MicIcon from "@mui/icons-material/Mic";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

import Markdown from "react-markdown";
import { PuffLoader } from "react-spinners";
import { useRef } from "react";

export default function ChatWindowComponent({ chatWindowProps }) {
  const modeluserchatRef = useRef(null);
  useEffect(() => {
    if (modeluserchatRef.current) {
      modeluserchatRef.current.scrollTop =
        modeluserchatRef.current.scrollHeight;
    }
  }, [chatWindowProps.chats]);
  return (
    <>
      <div className={styles.mainchatNavbar}>
        <IconButton sx={{ color: "white", fontSize: "1rem" }}>
          GeminiGPT
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </IconButton>

        <IconButton>
          <Avatar>H</Avatar>
        </IconButton>
      </div>
      <div className={styles.modeluserchat} ref={modeluserchatRef}>
        {/* Chat Container */}
        <Container>
          {chatWindowProps.chats.map((ele, idx) => {
            return (
              <div className={styles[ele.role]} key={idx}>
                {/* <p>{ele.content}</p> */}
                <Markdown>{ele.content}</Markdown>
              </div>
            );
          })}
        </Container>
        {chatWindowProps.chats.length === 0 ? (
          <div
            style={{
              height: "100%",
              alignContent: "center",
              justifyItems: "center",
            }}
          >
            <h1>Start New Chat</h1>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            paddingBottom: "2rem",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <PuffLoader
            color="#fff"
            loading={chatWindowProps.loading}
          ></PuffLoader>
        </div>
      </div>

      <div className={styles.inputChatBox}>
        <form onSubmit={chatWindowProps.handleForm}>
          <div className={styles.chatinput}>
            <span className={styles.icon}>
              <IconButton sx={{ color: "white" }}>
                <AddIcon></AddIcon>
              </IconButton>
            </span>
            <input
              required
              type="text"
              value={chatWindowProps.prompt}
              onChange={(e) => {
                chatWindowProps.setPrompt(e.target.value);
              }}
              placeholder="Ask anything"
            />

            <div className={styles.righticons}>
              <span className={styles.mic}>
                <IconButton sx={{ color: "white" }}>
                  <MicIcon></MicIcon>
                </IconButton>
              </span>
              <div className={styles.voice}>
                {/* <span className={styles.bars}></span> */}
                <IconButton type="sumbit">
                  <IosShareIcon></IosShareIcon>
                </IconButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
