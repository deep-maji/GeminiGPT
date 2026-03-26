import React, { useContext, useState } from "react";
import styles from "../../styles/AuthPage.module.css";
import Box from "@mui/material/Box";
import { TextField, FormLabel, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AuthPage() {
  const [fromTypeState, setFromTypeState] = useState(true);
  const [fromData, setFromData] = useState({
    email: "",
    fullanme: "",
    password: "",
  });
  const { handleLogin } = useContext(AuthContext);

  const handleFromSubmit = async () => {
    const res = await handleLogin(fromData.email, fromData.password);
    console.log(res.data);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#0f0f0f",
      }}
    >
      <Box
        sx={{
          width: "500px",
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
        className={styles.formConatiner}
      >
        <form
          action="lol.php"
          method="get"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Typography variant="h5" align="center" fontWeight="bold">
            {fromTypeState ? "Login" : "Signin"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Button
              onClick={() => {
                setFromTypeState(true);
              }}
              variant={fromTypeState ? "contained" : "outlined"}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setFromTypeState(false);
              }}
              variant={!fromTypeState ? "contained" : "outlined"}
            >
              Signin
            </Button>
          </Box>

          {!fromTypeState ? (
            <Box>
              <FormLabel>Fullname: </FormLabel>
              <TextField
                fullWidth
                type="fullanme"
                name="fullname"
                value={fromData.fullanme}
                onChange={(e) => {
                  setFromData((prev) => {
                    return { ...prev, fullanme: e.target.value };
                  });
                }}
                placeholder="Enter your fullname"
                variant="outlined"
                size="small"
              />
            </Box>
          ) : (
            <></>
          )}

          <Box>
            <FormLabel>Email</FormLabel>
            <TextField
              fullWidth
              type="email"
              name="email"
              value={fromData.email}
              onChange={(e) => {
                setFromData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              placeholder="Enter your email"
              variant="outlined"
              size="small"
            />
          </Box>

          <Box>
            <FormLabel>Password</FormLabel>
            <TextField
              fullWidth
              type="password"
              name="password"
              value={fromData.password}
              onChange={(e) => {
                setFromData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              placeholder="Enter your password"
              variant="outlined"
              size="small"
            />
          </Box>

          <Button
            variant="contained"
            onClick={handleFromSubmit}
            fullWidth
            sx={{
              padding: "0.6rem",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              backgroundColor: "#285A48",
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}
