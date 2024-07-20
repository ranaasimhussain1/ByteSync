import React from "react";
import { Link } from "react-router-dom";
const ForgetPassword = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-custom-blue flex rounded-2xl max-w-4xl p-5 items-center shadow-custom-glow relative">
        <div className="container mx-auto p-6 rounded-lg text-center">
          <h1 className="font-bold text-2xl mb-4 w-full text-white">
            We will reach out you soon
          </h1>
          <p className="font-bold text-l text-white mb-4 w-full mb-10">
            You can create a new account
          </p>

          <div className="  mt-12  ">
            <Link to="/signup">
              <button className=" bg-blue-500 hover:bg-blue-600 text-white rounded-xl hover:scale-110 duration-300">
                Create a new account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
