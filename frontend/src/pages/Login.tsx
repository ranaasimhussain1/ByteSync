// Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoPP from "../assets/loginPP.jpg";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (!auth) return;
    try {
      toast.loading("Signing In with Google", { id: "googleLogin" });
      await auth.loginWithGoogle();
      toast.success("Signed In Successfully with Google", {
        id: "googleLogin",
      });
      navigate("/");
    } catch (error) {
      toast.error("Signing In with Google Failed", { id: "googleLogin" });
      console.log(error);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
      navigate("/");
    } catch (error) {
      toast.error("Signing In Failed", { id: "login" });
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <section className="min-h-screen flex items-center justify-center">
        <div className="bg-custom-blue flex rounded-2xl max-w-3xl p-5 items-center shadow-custom-glow">
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={logoPP} alt="Login" />
          </div>
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl">ByteSync</h2>
            <p className="text-s mt-4">Login to your account</p>

            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <input
                className="p-2 mt-8 rounded-xl border placeholder-grey-200 text-custom-blue"
                type="email"
                name="email"
                placeholder="Email"
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full placeholder-grey-200 text-custom-blue"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <svg
                  onClick={handlePasswordToggle}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
              >
                Login
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <button
              onClick={() => handleGoogleLogin()}
              className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
            >
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-white">
              <a href="#" onClick={handleForgotPassword}>
                Forgot your password?
              </a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-white">
              <p>Don't have an account?</p>
              <Link to="/signup">
                <button className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default Login;
