import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logoPP from "../assets/loginPP.jpg";
import toast from "react-hot-toast";
const Histroy = ({ chats }) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const assistantChats = chats.filter((chat) => chat.role == "user");

    setChatHistory(assistantChats);
  }, [chats]);

  const handleDelete = async (assistantChat) => {
    try {
      // Send a request to delete the specific chat from the backend
      await axios.delete(`/chat/all-chats/${assistantChat._id}`);

      // Update local state to remove the deleted chat
      setChatHistory((prev) =>
        prev.filter((chat) => chat._id !== assistantChat._id)
      );
      toast.success("History deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };
  return (
    <section className=" min-h-screen flex items-center justify-center">
      <div className="bg-custom-blue flex rounded-2xl  max-w-3xl p-5 items-center shadow-custom-glow">
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={logoPP} />
        </div>
        <div className="rounded shadow-md p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">History Management</h1>
          <ul>
            {chatHistory.map((chat) => (
              <li
                key={chat._id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-2 rounded mb-2 cursor-pointer text-custom-blue"
              >
                <span>{chat.content}</span>
                <button
                  className="px-4 mr-2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white hover:scale-110 duration-300"
                  onClick={() => handleDelete(chat)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Histroy;
