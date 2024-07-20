// import mic from "../assets/mic.png";
// import send from "../assets/send copy.png";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
// import ChatItem from "../components/Header/chat/ChatItem";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
// } from "../helpers/api.comunicator";
// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };
// const Chat = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const msgEnd = useRef<HTMLDivElement | null>(null);

//   // const handleDeleteChats = async () => {
//   //   try {
//   //     toast.loading("Deleting Chats", { id: "deletechats" });
//   //     await deleteUserChats();
//   //     setChatMessages([]);
//   //     toast.success("Deleted Chats Successfully", { id: "deletechats" });
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error("Deleting chats failed", { id: "deletechats" });
//   //   }
//   // };
//   useEffect(() => {
//     msgEnd.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);
//   useLayoutEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Chats", { id: "loadchats" });
//       getUserChats()
//         .then((data) => {
//           setChatMessages([...data.chats]);
//           toast.success("Successfully loaded chats", { id: "loadchats" });
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Loading Failed", { id: "loadchats" });
//         });
//     }
//   }, [auth]);
//   useEffect(() => {
//     if (!auth?.user) {
//       return navigate("/");
//     }
//   }, [auth]);
//   if (chatMessages.length == 0) {
//     setChatMessages([{ role: "assistant", content: "Welcome to ByteSync" }]);
//   }
//   const handleSubmit = async () => {
//     console.log("Submit Button Works");

//     const content = inputRef.current?.value as string;
//     console.log(content);

//     if (inputRef && inputRef.current) {
//       inputRef.current.value = "";
//     }
//     const newMessage: Message = { role: "user", content };
//     console.log(newMessage);

//     setChatMessages((prev) => [...prev, newMessage]);
//     const chatData = await sendChatRequest(content);
//     console.log(chatData);

//     setChatMessages([...chatData.chats]);
//   };

//   return (
//     <div className="flex justify-center   h-screen">
//       <div className="w-2/4 bg-custom-blue  rounded-xl h-full shadow-custom-glow flex flex-col">
//         <div className="flex-1 m-4 relative ">
//           <div className="flex items-center mb-2  ">
//             <div className=" p-2 rounded-lg text-custom-blue  overflow-y-scroll max-h-custom hide-scrollbar">
//               {chatMessages.map((chat, index) => (
//                 <ChatItem content={chat.content} role={chat.role} key={index} />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div ref={msgEnd} />
//         <div className="flex  ">
//           <div className="mx-4 mb-4 bg-white w-full rounded-full">
//             <div className="  flex items-center  justify-between ">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Search"
//                 className="px-4 py-2  p-2 w-4/5 rounded-xl  placeholder-grey-200 text-custom-blue"
//               />
//               <div className=" flex mr-5 ">
//                 <img src={mic} alt="" className="h-7 w-7 mr-4 " />
//                 <img
//                   src={send}
//                   alt=""
//                   className="h-7 w-7 cursor-pointer"
//                   onClick={handleSubmit}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
// import mic from "../assets/mic.png";
// import send from "../assets/send copy.png";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
// import ChatItem from "../components/Header/chat/ChatItem";
// import {
//   deleteUserChats,
//   getUserChats,
//   sendChatRequest,
// } from "../helpers/api.comunicator";
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }
// }
// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// const Chat = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const msgEnd = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Chats", { id: "loadchats" });
//       getUserChats()
//         .then((data) => {
//           // Set the initial chat message if no chats are available
//           if (data.chats.length === 0) {
//             setChatMessages([
//               { role: "assistant", content: "Welcome to ByteSync" },
//             ]);
//           } else {
//             setChatMessages([...data.chats]);
//           }
//           toast.success("Successfully loaded chats", { id: "loadchats" });
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error("Loading Failed", { id: "loadchats" });
//         });
//     }
//   }, [auth]);

//   useEffect(() => {
//     // Scroll to end whenever chatMessages change
//     msgEnd.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   useEffect(() => {
//     if (!auth?.user) {
//       navigate("/");
//     }
//   }, [auth]);
//   const handleSpeech = () => {
//     // Check if the browser supports the Web Speech API
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (event) => {
//       const speechResult = event.results[0][0].transcript;
//      'inputRef.current' is possibly 'null'. = speechResult;
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error", event);
//     };

//     recognition.onend = () => {
//       console.log("Speech recognition service disconnected");
//     };

//     recognition.start();
//   };
//   const handleSubmit = async () => {
//     const content = inputRef.current?.value as string;
//     if (inputRef && inputRef.current) {
//       inputRef.current.value = "";
//     }
//     const newMessage: Message = { role: "user", content };
//     setChatMessages((prev) => [...prev, newMessage]);
//     const chatData = await sendChatRequest(content);
//     setChatMessages([...chatData.chats]);
//   };

//   return (
//     <div className="flex justify-center h-screen">
//       <div className="w-2/4 bg-custom-blue rounded-xl h-full shadow-custom-glow flex flex-col">
//         <div className="flex-1 m-4 relative">
//           <div className="flex items-center mb-2">
//             <div className="p-2 rounded-lg text-custom-blue overflow-y-scroll max-h-custom hide-scrollbar">
//               {chatMessages.map((chat, index) => (
//                 <ChatItem content={chat.content} role={chat.role} key={index} />
//               ))}
//               {/* Place msgEnd here to ensure it's rendered */}
//               <div ref={msgEnd} />
//             </div>
//           </div>
//         </div>
//         <div className="flex">
//           <div className="mx-4 mb-4 bg-white w-full rounded-full">
//             <div className="flex items-center justify-between overflow-y-scroll max-h-custom hide-scrollbar">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Search"
//                 className="px-4 py-2 p-2 w-4/5 rounded-xl placeholder-grey-200 text-custom-blue"
//               />
//               <div className="flex mr-5">
//                 <img
//                   src={mic}
//                   alt=""
//                   className="h-7 w-7 mr-4 cursor-pointer"
//                   onClick={handleSpeech}
//                 />
//                 <img
//                   src={send}
//                   alt=""
//                   className="h-7 w-7 cursor-pointer"
//                   onClick={handleSubmit}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import mic from "../assets/mic.png";
import send from "../assets/send copy.png";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import ChatItem from "../components/Header/chat/ChatItem";
import { getUserChats, sendChatRequest } from "../helpers/api.comunicator";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const msgEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          // Set the initial chat message if no chats are available
          if (data.chats.length === 0) {
            setChatMessages([
              { role: "assistant", content: "Welcome to ByteSync" },
            ]);
          } else {
            setChatMessages([...data.chats]);
          }
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    // Scroll to end whenever chatMessages change
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (!auth?.user) {
      navigate("/");
    }
  }, [auth]);

  const handleSpeech = () => {
    // Check if the browser supports the Web Speech API
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      if (inputRef.current) {
        inputRef.current.value = speechResult;
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };

    recognition.onend = () => {
      console.log("Speech recognition service disconnected");
    };

    recognition.start();
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w bg-custom-blue rounded-xl h-full shadow-custom-glow flex flex-col">
        <div className="flex-1 m-4 relative">
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg text-custom-blue overflow-y-scroll max-h-custom hide-scrollbar">
              {chatMessages.map((chat, index) => (
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))}
              {/* Place msgEnd here to ensure it's rendered */}
              <div ref={msgEnd} />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mx-4 mb-4 bg-white w-full rounded-full">
            <div className="flex items-center justify-between overflow-y-scroll max-h-custom hide-scrollbar">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="px-4 py-2 p-2 w-4/5 rounded-xl placeholder-grey-200 text-custom-blue"
              />
              <div className="flex mr-5">
                <img
                  src={mic}
                  alt=""
                  className="h-7 w-7 mr-4 cursor-pointer"
                  onClick={handleSpeech}
                />
                <img
                  src={send}
                  alt=""
                  className="h-7 w-7 cursor-pointer"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
