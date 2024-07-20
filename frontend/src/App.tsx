import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Chat from "./pages/Chat";
import Feedback from "./pages/Feedback";
import Histroy from "./pages/Histroy";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Share from "./pages/Share";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import axios from "axios";
import SvgAvatar from "./components/Avatar";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("/chat/all-chats");
        // Adjust the endpoint as needed
        setChats(response.data.chats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);
  const auth = useAuth();
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      {" "}
      {/* Provide your Google OAuth client ID */}
      <div className="flex">
        <div className="flex h-full ">
          <Header />
        </div>
        <div className="flex h-screen w-full grid justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {auth?.isLoggedIn && auth.user && (
              <Route path="/chat" element={<Chat />} />
            )}
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="/share"
              element={
                <Share url={"http://localhost:5000/api/v1/chat/all-chats"} />
              }
            />
            <Route path="/histroy" element={<Histroy chats={chats} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/avatar" element={<SvgAvatar />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Routes>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
