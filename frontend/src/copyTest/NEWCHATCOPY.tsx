import { useEffect, useState } from "react";
import "../styles/Chat.css";
import type { ChatMessage, ChatsHistroy } from "../types/AuthTypes";
import { logoutUser } from "../apis/Auth";
import { useAuth } from "../hooks/useAuth";
import type { AxiosResponse } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { creatNewMessage, getAllThreadHistroy, getChatById } from "../apis/Chat.api";
import { TailSpin } from "react-loader-spinner";


export default function Chat() {

  // React Router Dom
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  // Custom Hooks
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // Sattes
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatHistroy, setChatHistroy] = useState<ChatsHistroy[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [threadMessages, setThreadMessages] = useState<ChatMessage[]>([]);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [newThreadId, setNewThreadId] = useState<string | null>(null);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);


  // useEffect and functions
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
          return; // Ignore expected cancellation
        }
        setAuth(null);
        navigate("/auth", { state: { from: location }, replace: true });
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
    const { controller: getChatByIdController, getChatByIdReq } = getChatById(axiosPrivate, param?.id || currentThreadId || "");
    setCurrentThreadId(param?.id || null);

    const handleChatById = async () => {
      setIsLoading(true);
      try {
        const respone: AxiosResponse | null = await getChatByIdReq();

        if (respone !== null) {
          console.log(respone.data);
          isMounted && setThreadMessages(respone.data.response.messages);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.log("handle chat by id error - ", error);
      }
      finally {
        setIsLoading(false);
      }
    }

    if (param.id !== undefined && newThreadId === null) {
      handleChatById();
    }

    return () => {
      isMounted = false;
      getChatByIdController.abort();
    }
  }, [param.id])


  useEffect(() => {
    const { threadController, creatNewMessageReq } = creatNewMessage(axiosPrivate, param.id || currentThreadId || "", userMessage);

    const handleNewThreadMessage = async () => {
      setMessageLoading(true);
      try {
        const response = await creatNewMessageReq();

        if (response !== null) {
          console.log(response.data.response);
          setThreadMessages((prev) => ([...prev, response?.data.response]));
        }

      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.log("Handle new thread message error : ", error);
      }
      finally {
        setMessageLoading(false);
      }
    }

    if (newThreadId !== null) {
      setUserMessage("");
      handleNewThreadMessage();
    }

    return () => {
      threadController.abort();
    }
  }, [newThreadId])

  const handleThreadCon = async () => {
    const { threadController, creatNewMessageReq } = creatNewMessage(axiosPrivate, param.id || currentThreadId || "", userMessage);

    const handleNewThreadMessage = async () => {
      setMessageLoading(true);
      try {
        const response = await creatNewMessageReq();

        if (response !== null) {
          console.log(response.data.response);
          setThreadMessages((prev) => ([...prev, response?.data.response]));
        }

      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.log("Handle new thread message error : ", error);
      }
      finally {
        setMessageLoading(false);
      }
    }

    if (currentThreadId !== null) {

      handleNewThreadMessage();
    }
  }

  const handleThreadConSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setThreadMessages((prev) => ([...prev, {
      content: userMessage,
      role: "user",
      _id: uuidv4()
    }]));
    handleThreadCon();
    setUserMessage("");
  }


  const handleThreadNavigate = (id: string) => {
    setCurrentThreadId(id);
    setNewThreadId(null);
    navigate(`/c/${id}`);
  }

  const submitCreatNewThread = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newthreadId: string = uuidv4();
    setCurrentThreadId(newthreadId);
    setNewThreadId(newthreadId);
    setThreadMessages([{
      content: userMessage,
      role: "user",
      _id: uuidv4()
    }])
    navigate(`/c/${newthreadId}`);
  }

  const handleNagivateToNewThread = () => {
    setThreadMessages([]);
    setCurrentThreadId(null);
    setUserMessage("");
    setNewThreadId(null);
    navigate("/c");
  }

  return (
    <div className="text-on-surface flex">
      <aside className="flex flex-col py-6 px-4 gap-2 h-screen w-64 fixed left-0 top-0 bg-surface-container-low font-inter text-sm z-60 transform -translate-x-full transition-transform duration-300 hover:translate-x-0 group">
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 bg-surface-container px-1 py-4 rounded-r-lg cursor-pointer">
          <span className="material-symbols-outlined text-primary-dim text-xs" data-icon="chevron_right">chevron_right</span>
        </div>
        <div className="mb-5 px-2">
          <h1 className="text-lg font-semibold text-[#e6e4ec] tracking-tight">
            The Void
          </h1>
        </div>
        <nav className="flex flex-col gap-1 flex-1 min-h-0">
          {/* <!-- Active State: New Chat --> */}
          <button onClick={handleNagivateToNewThread} className="flex items-center gap-3 py-1 px-2 text-[#e6e4ec]/40 hover:bg-surface-container hover:text-[#e6e4ec] rounded-lg transition-all">
            <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
            <span>New Chat</span>
          </button>

          {/* <!-- Recent Conversations List (History Expansion) --> */}
          <div className="mt-8 px-2 flex flex-col flex-1 min-h-0">
            <span
              className="text-[10px] uppercase tracking-widest text-on-surface-variant/40 font-bold mb-4 block">Recent Threads</span>
            <div className="flex flex-col gap-1 py-1 overflow-y-auto min-h-0">
              {
                chatHistroy.length !== 0 ? chatHistroy.map((ele) => {
                  return (<div onClick={() => (handleThreadNavigate(ele.threadId))} key={ele._id} className="relative cursor-default flex items-center justify-between p-1 text-xs text-on-surface-variant hover:text-background hover:bg-gray-400 rounded-[10px] transition-colors">
                    <p>{ele.title}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(
                          openMenuId === ele._id ? null : ele._id
                        );
                      }}
                      className="flex items-center justify-center rounded-full hover:bg-gray-300"
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === ele._id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-10 z-50 w-56 bg-white shadow-lg rounded-2xl border p-2"
                      >
                        <div className="flex flex-col text-sm text-gray-700">
                          <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl">
                            <i className="fa-solid fa-share"></i>
                            Share
                          </button>

                          <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl">
                            <i className="fa-solid fa-user-plus"></i>
                            Start a group chat
                          </button>

                          <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl">
                            <i className="fa-solid fa-pen"></i>
                            Rename
                          </button>

                          <hr className="my-2" />

                          <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl">
                            <i className="fa-solid fa-thumbtack"></i>
                            Pin chat
                          </button>

                          <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-xl">
                            <i className="fa-solid fa-box-archive"></i>
                            Archive
                          </button>

                          <button className="flex items-center gap-3 px-3 py-2 hover:bg-red-100 text-red-500 rounded-xl">
                            <i className="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>)
                }) : <></>
              }
            </div>
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
        <header className="w-full px-5 h-16 flex flex-nowrap justify-between items-center overflow-y-auto">
          <div className="font-manrope tracking-widest text-xl font-bold text-on-background whitespace-nowrap">
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

        {
          isLoading ? <div className="flex items-center justify-center h-screen"><TailSpin
            visible={true}
            height="50"
            width="50"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          /></div> : <section className="flex-1 px-5 lg:px-20 xl:px-40 pt-8 flex flex-col gap-12 mx-auto w-full overflow-y-auto">
            {
              threadMessages.map((ele, idx) => {
                return (<div key={idx}>
                  {
                    ele.role === "user" ?
                      <div className="flex justify-end w-full">
                        <div
                          className="max-w-[80%] bg-secondary-container text-on-background px-6 py-4 rounded-xl shadow-sm"
                        >
                          <div className="leading-relaxed text-body">
                            <Markdown remarkPlugins={[remarkGfm]}>{ele.content}</Markdown>
                          </div>
                        </div>
                      </div> : <div className="flex flex-col gap-6 w-full items-start markdown-body">
                        <Markdown remarkPlugins={[remarkGfm]}>{ele.content}</Markdown>
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
                  }
                </div>)
              })
            }

            {
              messageLoading ? <div className="flex items-center justify-center"><TailSpin
                visible={true}
                height="50"
                width="50"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              /></div> : <></>
            }
          </section>
        }

        {/* <!-- Fixed Input Area --> */}
        {
          threadMessages.length === 0 ? <div className="flex flex-col justify-center w-full h-screen max-w-4xl mx-auto my-auto px-6 pb-2 pt-4 ">
            <div className="flex items-center justify-center mb-10">
              <p className="text-3xl">Ready when you are.</p>
            </div>
            <form onSubmit={submitCreatNewThread} className="input-inside-container overflow-y-auto relative flex items-center bg-surface-container-high rounded-full px-6 py-3 border border-outline-variant/15 focus-within:border-primary/40 focus-within:shadow-[0_0_25px_rgba(192,193,255,0.1)] transition-all">
              <input
                required
                onChange={(e) => setUserMessage(e.target.value)}
                value={userMessage}
                className="w-full flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 px-4 py-2 font-inter text-sm"
                placeholder="Whisper to the Void..."
                type="text"
                style={{ "outline": "none" }}
              />
              <div className="flex items-center gap-4">
                <button
                  className="h-10 w-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <span className="material-symbols-outlined" data-icon="arrow_upward"
                  >arrow_upward</span>
                </button>
              </div>
            </form>

            <div className="w-full h-32"></div>
          </div> : < div className="w-full max-w-4xl mx-auto px-6 pb-2 pt-4 " >
            <form onSubmit={handleThreadConSubmit} className="input-inside-container overflow-y-auto relative flex items-center bg-surface-container-high rounded-full px-6 py-3 border border-outline-variant/15 focus-within:border-primary/40 focus-within:shadow-[0_0_25px_rgba(192,193,255,0.1)] transition-all">
              <input
                disabled={isLoading || messageLoading ? true : false}
                required
                onChange={(e) => setUserMessage(e.target.value)}
                value={userMessage}
                className="w-full flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 px-4 py-2 font-inter text-sm"
                placeholder="Whisper to the Void..."
                type="text"
                style={{ "outline": "none" }}
              />
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading || messageLoading ? true : false}
                  className="disabled:scale-[1.0] disabled:opacity-50 h-10 w-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  {
                    messageLoading ? <i className="fa-solid fa-square"></i> : <span className="material-symbols-outlined" data-icon="arrow_upward"
                    >arrow_upward</span>
                  }
                </button>
              </div>
            </form>
            <p
              className="text-[10px] text-center mt-3 text-on-surface-variant/30 tracking-widest uppercase"
            >
              Ethereal Intelligence can hallucinate. Cross-reference for critical
              thought.
            </p>
          </div>
        }
      </main>
    </div>
  )
}