import "./App.css";
import ChatPage from "./components/pages/ChatPage";
import Home from "./components/pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./components/pages/AuthPage";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/chats" element={<ChatPage />}></Route>
              <Route path="/chats/:url" element={<ChatPage />}></Route>
              <Route path="/auth" element={<AuthPage />}></Route>
            </Routes>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
