import styles from "../../styles/Home.module.css";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

import RateReviewTwoToneIcon from "@mui/icons-material/RateReviewTwoTone";
import IconButton from "@mui/material/IconButton";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Markdown from "react-markdown";

export default function SideBarComponent({ sideBarProps }) {
  return (
    <>
      <div className={styles.sideNavbarWrapper}>
        <div className={styles.sideNavbar}>
          <div>GeminiGPT</div>
          <IconButton sx={{ color: "white" }}>
            <RateReviewTwoToneIcon></RateReviewTwoToneIcon>
          </IconButton>
        </div>
      </div>

      <div className={styles.chatsHistroy}>
        {sideBarProps.chatsHistroy.map((ele, id) => {
          return (
            <div
              className={`${styles.chat} ${ele.selected ? styles.selectedChat : ""}`}
              key={id}
            >
              <h6
                onClick={() => {
                  sideBarProps.handleChatbyID(ele._id);
                }}
              >
                <Markdown>{ele.title}</Markdown>
              </h6>
              <IconButton sx={{ padding: 0, color: "white" }}>
                <MoreHorizIcon></MoreHorizIcon>
              </IconButton>
            </div>
          );
        })}
      </div>
    </>
  );
}
