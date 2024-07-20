import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import logoPP from "../assets/loginPP.jpg";

const Feedback = () => {
  const form = useRef<HTMLFormElement>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current) {
      // Append the selected emoji to the form data
      const formData = new FormData(form.current);
      formData.append("selected_emoji", selectedEmoji);

      emailjs
        .sendForm(
          "service_zxr48ni",
          "template_c7o7w9g",
          form.current,
          "yAosRZ99MieEL5i2d"
        )
        .then(
          () => {
            console.log("SUCCESS!");
            toast.success("Thanks for your feedback");
            form.current.reset();
            setSelectedEmoji("");
          },
          (error) => {
            console.log("FAILED...", error.text);
            toast.error("Unable to send feedback");
          }
        );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-custom-blue flex rounded-2xl max-w-3xl p-5 items-center shadow-custom-glow">
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={logoPP} alt="Logo" />
        </div>
        <div className="md:w-1/2 px-8">
          <div className="flex items-center justify-center p-4">
            <div className="rounded shadow-md p-6 w-full">
              <h1 className="text-2xl font-bold mb-4">Feedback</h1>
              <form ref={form} onSubmit={sendEmail}>
                <input
                  className="p-2 mt-6 rounded-xl border placeholder-grey-200 text-custom-blue w-full"
                  type="text"
                  name="user_name"
                  placeholder="Username"
                  required
                />
                <input
                  className="p-2 mt-4 rounded-xl border placeholder-grey-200 text-custom-blue w-full"
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  required
                />
                <div className="mb-4 mt-2">
                  <p className="text-white mb-2">How was your experience?</p>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const emoji = String.fromCodePoint(0x1f641 + value);
                      return (
                        <button
                          type="button"
                          key={value}
                          className={`mr-2 p-1 ${
                            selectedEmoji === emoji
                              ? "bg-blue-900 border-2"
                              : ""
                          }`}
                          onClick={() => setSelectedEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <input
                  type="hidden"
                  name="selected_emoji"
                  value={selectedEmoji}
                />
                <div className="mb-4">
                  <label className="block text-white">
                    Write your feedback
                  </label>
                  <textarea
                    name="message"
                    className="mt-1 p-2 w-full border rounded text-custom-blue"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
