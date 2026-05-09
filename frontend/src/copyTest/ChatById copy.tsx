import { useEffect, useState } from "react";
import "../styles/Chat.css";
import type { ChatsHistroy } from "../types/AuthTypes";
import { getAllThreadHistroy, getChatById, logoutUser } from "../apis/Auth";
import { useAuth } from "../hooks/useAuth";
import type { AxiosResponse } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from "axios";



export default function ChatByIdCopy() {

  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [open, setOpen] = useState<boolean>(false);
  const [chatHistroy, setChatHistroy] = useState<ChatsHistroy[]>([]);

  const handleLogout = async () => {
    try {
      const respone: AxiosResponse | null = await logoutUser();
      if (respone !== null) {
        if (respone.status === 200) {
          return setAuth(null);
        }
      }
      else {
        console.log("Server is not responed.");
      }
    } catch (error) {
      console.error("Logout error : ", error);

    }
  }




  useEffect(() => {
    let isMounted: boolean = true;
    const { controller, getThreadshistroyRequest } = getAllThreadHistroy(axiosPrivate);

    const handleChatsHistroy = async () => {
      try {
        const respone: AxiosResponse | null = await getThreadshistroyRequest();

        if (respone !== null) {
          console.log(respone.data);
          isMounted && setChatHistroy(respone.data.threadHistroy);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          // Ignore expected cancellation
          return;
        }
        setAuth(null);
        navigate("/auth", { state: { from: location }, replace: true })
      }
    }

    handleChatsHistroy();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  useEffect(() => {
    let isMounted: boolean = true;
    const { controller: chatController, getChatByIdReq } = getChatById(axiosPrivate, param.id || "");

    const handleChatById = async () => {
      try {
        const respone: AxiosResponse | null = await getChatByIdReq();

        if (respone !== null) {
          console.log(respone.data.response.messages);

        }
      } catch (error) {

      }
    }

    handleChatById();

    return () => {
      isMounted = false;
      chatController.abort();
    }
  }, [param.id])

  const handleChatNavigate = (id: string) => {
    navigate(`/c/${id}`)
  }

  return (
    <div className="text-on-surface flex">
      <aside className="w-64 h-screen shrink-0 bg-surface-container-low z-21 hidden md:flex flex-col p-3">
        <div className="mb-5 px-2">
          <h1 className="text-lg font-semibold text-[#e6e4ec] tracking-tight">
            The Void
          </h1>
        </div>
        <nav className="flex flex-col gap-1 flex-1 min-h-0">
          {/* <!-- Active State: New Chat --> */}
          <button
            className="flex items-center gap-3 py-1 px-2 text-[#e6e4ec]/40 hover:bg-surface-container hover:text-[#e6e4ec] rounded-lg transition-all"
          >
            <span
              className="material-symbols-outlined"
              data-icon="add_circle"
            >add_circle</span>
            <span>New Chat</span>
          </button>

          {/* <!-- Recent Conversations List (History Expansion) --> */}
          <div className="mt-8 px-2 flex flex-col flex-1 min-h-0">
            <span
              className="text-[10px] uppercase tracking-widest text-on-surface-variant/40 font-bold mb-4 block">Recent Threads</span>
            {
              chatHistroy.length !== 0 ? chatHistroy.map((ele) => {
                return (<div onClick={() => (handleChatNavigate(ele._id))} key={ele._id} className="flex flex-col gap-4 py-1 overflow-y-auto min-h-0">
                  <div className="text-xs text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                    <Markdown remarkPlugins={[remarkGfm]}>{ele.title}</Markdown>
                  </div>
                </div>)
              }) : <></>
            }
          </div>
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex flex-col gap-1 mt-4">
            <button className="flex items-center gap-3 px-4 py-2 text-[#e6e4ec]/30 hover:text-[#e6e4ec] transition-all text-xs">
              <span className="material-symbols-outlined text-sm" data-icon="help_outline">help_outline</span> Help
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-[#e6e4ec]/30 hover:text-[#e6e4ec] transition-all text-xs">
              <span className="material-symbols-outlined text-sm" data-icon="logout">logout</span>Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="w-full h-screen bg-surface text-on-background overflow-auto flex flex-col">
        <header className="w-full px-5 h-16 flex justify-between items-center overflow-y-auto">
          <div className="font-manrope tracking-widest text-xl font-bold text-on-background">
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden mt-2"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span>Ethereal AI</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-manrope">

            <a
              className="text-[#e6e4ec]/60 hover:text-[#c0c1ff] transition-colors duration-300"
              href="#"
            >Settings</a>
            <div
              className="ml-4 h-8 w-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/15"
            >
              <span className="material-symbols-outlined" data-icon="account_circle"
              >account_circle</span>
            </div>
          </div>
        </header>

        <section className="flex-1 px-5 flex flex-col gap-12 max-w-5xl mx-auto w-full overflow-y-auto">
          {/* <!-- User Message --> */}
          <div className="flex justify-end w-full">
            <div
              className="max-w-[80%] bg-secondary-container text-on-background px-6 py-4 rounded-xl shadow-sm"
            >
              <p className="leading-relaxed text-body">
                Explain the concept of "Digital Sanctuary" in the context of
                sentient interfaces. I'm looking for a philosophical perspective
                rather than technical.
              </p>
            </div>
          </div>

          {/* <!-- AI Response --> */}
          <div className="flex flex-col gap-6 w-full items-start">

            {/* Text cames here. */}
            <p className="leading-relaxed text-body">
              Explain the concept of "Digital Sanctuary" in the context of
              sentient interfaces. I'm looking for a philosophical perspective
              rather than technical.
            </p>
            {/* <!-- Action Bar for Response --> */}
            <div
              className="flex gap-4 ml-0 opacity-40 hover:opacity-100 transition-opacity"
            >
              <button className="hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="content_copy"
                >content_copy</span>
              </button>
              <button className="hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="thumb_up"
                >thumb_up</span>
              </button>
              <button className="hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="refresh"
                >refresh</span>
              </button>
            </div>
          </div>
        </section>

        {/* <!-- Fixed Input Area --> */}
        <div className="w-full max-w-4xl mx-auto px-6 pb-2 pt-4 ">
          <div
            className="input-inside-container overflow-y-auto relative flex items-center bg-surface-container-high rounded-full px-6 py-3 border border-outline-variant/15 focus-within:border-primary/40 focus-within:shadow-[0_0_25px_rgba(192,193,255,0.1)] transition-all"
          >
            <button
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
            >
              <span className="material-symbols-outlined" data-icon="add">add</span>
            </button>
            <input
              className="w-full flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 px-4 py-2 font-inter text-sm"
              placeholder="Whisper to the Void..."
              type="text"
              style={{ "outline": "none" }}
            />
            <div className="flex items-center gap-4">
              <button
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined" data-icon="mic">mic</span>
              </button>
              <button
                className="h-10 w-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined" data-icon="arrow_upward"
                >arrow_upward</span>
              </button>
            </div>
          </div>
          <p
            className="text-[10px] text-center mt-3 text-on-surface-variant/30 tracking-widest uppercase"
          >
            Ethereal Intelligence can hallucinate. Cross-reference for critical
            thought.
          </p>
        </div>
      </main>
    </div>
  )
}