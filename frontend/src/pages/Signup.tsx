import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoPP from "../assets/loginPP.jpg";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(name, email, password);

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <section className=" min-h-screen flex items-center justify-center">
      <div className="bg-custom-blue flex rounded-2xl  max-w-3xl p-5 items-center shadow-custom-glow">
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={logoPP} />
        </div>
        <div className="md:w-1/2 px-8 md:px-16 ">
          <h2 className="font-bold text-2xl ">ByteSync</h2>
          <p className="text-s mt-4 ">Create your account</p>

          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              className="p-2 mt-6  rounded-xl border placeholder-grey-200 text-custom-blue"
              type="name"
              name="name"
              placeholder="Username"
            />
            <input
              className="p-2  rounded-xl border placeholder-grey-200 text-custom-blue"
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
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-xl text-white py-2 hover:scale-105 duration-300 mt-2"
            >
              Signup
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-white mt-20">
            <p>Alreay have an account?</p>
            <Link to="/login">
              {" "}
              <button className="py-2 px-5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
