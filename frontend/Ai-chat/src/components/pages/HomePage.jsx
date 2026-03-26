import React from "react";
import Button from "@mui/material/Button";
import styles from "../../styles/HomePage.module.css";
import { useNavigate } from "react-router";

export default function Home() {
  const route = useNavigate();
  return (
    <div>
      <nav></nav>
      <div className={styles.startDivContainer}>
        <div className={styles.startDiv}>
          <h1>GeminiGPT</h1>
          <Button
            sx={{ backgroundColor: "#285A48", marginTop: "0.5rem" }}
            variant="contained"
            onClick={() => {
              route("/chats");
            }}
          >
            Get Start
          </Button>
        </div>
      </div>
    </div>
  );
}
