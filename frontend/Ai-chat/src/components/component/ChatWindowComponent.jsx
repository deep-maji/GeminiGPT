import styles from "../../styles/Home.module.css";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import IconButton from "@mui/material/IconButton";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextField from "@mui/material/TextField";
import IosShareIcon from "@mui/icons-material/IosShare";
import MicIcon from "@mui/icons-material/Mic";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";

import Markdown from "react-markdown";

export default function ChatWindowComponent({ chatWindowProps }) {
  return (
    <>
      <div className={styles.mainchatNavbar}>
        <IconButton sx={{ color: "white", fontSize: "1rem" }}>
          GeminiGPT
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </IconButton>
        {/* <IconButton sx={{ color: "white" }}>
            <MoreHorizIcon></MoreHorizIcon>
          </IconButton> */}
        <IconButton>
          <Avatar>H</Avatar>
        </IconButton>
        {/* <Menu id="profile-menu" open={true}>
            <MenuItem>Profile</MenuItem>
          </Menu> */}
      </div>
      <div className={styles.modeluserchat}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          {chatWindowProps.chats.map((ele, idx) => {
            return (
              <div className={styles[ele.role]} key={idx}>
                {/* <p>{ele.content}</p> */}
                <Markdown>{ele.content}</Markdown>
              </div>
            );
          })}
        </Container>
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
