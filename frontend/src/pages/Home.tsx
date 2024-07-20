import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/login.png";
import logoPP from "../assets/loginPP.jpg";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const auth = useAuth();
  return (
    <section className=" min-h-screen flex items-center justify-center">
      <div className="bg-red flex rounded-2xl  max-w-3xl p-5 items-center shadow-custom-glow">
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={logoPP} />
        </div>
        <div className="md:w-1/2  px-4 ">
          <h2 className="font-bold text-2xl mb-4 w-full">
            Welcome to ByteSync
          </h2>
          {auth?.isLoggedIn ? (
            <>
              <Link to="/chat">
                {" "}
                <button className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300 mr-4">
                  Chats
                </button>
              </Link>
              <Link to="/">
                {" "}
                <button
                  className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300"
                  onClick={auth?.logout}
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                {" "}
                <button className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300 mr-4">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                {" "}
                <button className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
